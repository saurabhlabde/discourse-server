import { UserInputError } from "apollo-server-errors";
import { Arg, Ctx, ID, Mutation, Resolver } from "type-graphql";
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

    let resFindRoomOrCreate: any;

    resFindRoomOrCreate = await prisma.room.findFirst({
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

    if (!resFindRoomOrCreate) {
      resFindRoomOrCreate = await prisma.room.create({
        data: {
          roomUsername: roomUser.username,
          username: auth.username,
        }
      })
      await prisma.userId.createMany({
        data: [
          {
            roomId: resFindRoomOrCreate.id,
            userId: auth.id
          }, {
            roomId: resFindRoomOrCreate.id,
            userId: roomUser.id
          }
        ]
      })
    }

    const resCreateMessage: any = await prisma.message.create({
      data: {
        userId: auth.id,
        roomId: resFindRoomOrCreate.id,
        text,
        media,
        status: "UNDELIVERED",
      }, include: {
        User: true
      }
    })

    if (!resCreateMessage) {
      const message_ = throwMessage({
        errors,
        message: "Message create failed",
        type: "error"
      })
      throw new UserInputError('ERROR', { message_ })
    }


    await ctx.pubSub.publish("ADD_MESSAGES", { payload: resCreateMessage });

    return resCreateMessage
  }
}
