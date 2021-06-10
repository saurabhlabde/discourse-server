import { UserInputError } from "apollo-server-errors";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { PrismaType } from "../..";
import { throwMessage } from "../../utils/message";
import { userCheck } from "../../utils/userCheck";
import { Message } from "../types";
import { MessageInput } from "./type";


@Resolver(of => Message)

export class MessageResolver {

        @Query(returns => [Message])

        async getMessage(@Arg('get') getInput: MessageInput, @Ctx() ctx: any) {
                const { auth } = await userCheck(ctx)

                const { roomUsername } = getInput

                const prisma: PrismaType = ctx.prisma

                const resRoomUser: any = await prisma.user.findFirst({
                        where: {
                                username: roomUsername
                        }
                })

                if (!resRoomUser) {
                        const message_ = throwMessage({
                                errors: [],
                                message: "Room user not found",
                                type: "error"
                        })

                        throw new UserInputError('NOT_FOUND', { message_ })
                }

                const resMessage: any = await prisma.room.findFirst({
                        where: {
                                OR: [
                                        {
                                                username: auth.username,
                                                roomUsername: resRoomUser.username
                                        },
                                        {
                                                roomUsername: auth.username,
                                                username: resRoomUser.username
                                        },
                                ]
                        },
                        select: {
                                Message: {
                                        include: {
                                                User: true
                                        }
                                },
                        }
                })

                return resMessage?.Message

        }
}