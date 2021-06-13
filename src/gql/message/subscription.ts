import { UserInputError } from "apollo-server-errors";
import { Arg, Ctx, Resolver, Subscription } from "type-graphql";
import { PrismaType } from "../..";
import { throwMessage } from "../../utils/message";
import { userCheck } from "../../utils/userCheck";
import { Message } from "../types";
import { MessageSubInput } from "./type";

@Resolver(of => Message)
export class MessageSubscriptionResolver {
        @Subscription(() => [Message], {
                topics: ["ADD_MESSAGES", "DELETE_MESSAGES", "LIKE_MESSAGES"],
        })

        async getMessageSub(@Arg('get') getInput: MessageSubInput, @Ctx() ctx: any,): Promise<any> {

                const { roomUsername, username } = getInput

                const prisma: PrismaType = ctx.prisma

                const resRoomUser: any = await prisma.user.findFirst({
                        where: {
                                username: roomUsername
                        }
                })

                const resUser: any = await prisma.user.findFirst({
                        where: {
                                username: username
                        }
                })

                if (!resRoomUser || !resUser) {
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
                                                username: resUser.username,
                                                roomUsername: resRoomUser.username
                                        },
                                        {
                                                roomUsername: resUser.username,
                                                username: resRoomUser.username
                                        },
                                ]
                        },
                        select: {
                                Message: {
                                        include: {
                                                User: true,
                                                Like: true,
                                        },
                                        orderBy: {
                                                createdAt: "asc"
                                        }
                                },

                        }
                })

                return resMessage?.Message

        }
}
