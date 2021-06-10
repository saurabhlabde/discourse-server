import { UserInputError } from "apollo-server-errors";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { PrismaType } from "../..";
import { throwMessage } from "../../utils/message";
import { userCheck } from "../../utils/userCheck";
import { Message } from "../types";
import { CreateMessageInput } from './type'

@Resolver(of => Message)

export class CreateMessageResolver {
  @Mutation((returns) => Message)
  async createMessage(@Arg("create") createInput: CreateMessageInput, @Ctx() ctx: any) {
    const { auth } = await userCheck(ctx)

    const { roomUsername, media, text } = createInput

    const prisma: PrismaType = ctx.prisma

    const roomUser = await prisma.user.findFirst({
      where: {
        username: roomUsername
      }
    })

    let errors = []

    if (!roomUser) {
      const message_ = throwMessage({
        errors,
        message: "Room user not found",
        type: "error"
      })
      throw new UserInputError('NOT_FOUND', { message_ })
    }

    const resFindRoom: any = await prisma.room.findFirst({
      where: {
        OR: [
          {
            username: auth.username,
            roomUsername: roomUser.username
          },
          {
            roomUsername: auth.username,
            username: roomUser.username
          },
        ]
      }
    })

    if (!resFindRoom) {
      await prisma.room.create({
        data: {
          roomUsername: roomUser.username,
          username: auth.username,
        }
      })
    }

    const resCreateRoom: any = await prisma.message.create({
      data: {
        userId: auth.id,
        roomId: resFindRoom.id,
        text,
        media,
        status: "UNDELIVERED",
      }, include: {
        User: true
      }
    })

    if (!resCreateRoom) {
      const message_ = throwMessage({
        errors,
        message: "Message create failed",
        type: "error"
      })
      throw new UserInputError('ERROR', { message_ })
    }

    return resCreateRoom

  }
}
