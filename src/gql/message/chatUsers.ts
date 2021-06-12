import { UserInputError } from "apollo-server-errors";
import { Ctx, Query, Resolver } from "type-graphql";
import { PrismaType } from "../..";
import { throwMessage } from "../../utils/message";
import { userCheck } from "../../utils/userCheck";
import { RoomUsersType } from "./type";



@Resolver(of => RoomUsersType)

export class ChatUsers {
        @Query(returns => [RoomUsersType])

        async chatUsers(@Ctx() ctx: any) {
                const { auth } = await userCheck(ctx)

                const prisma: PrismaType = ctx.prisma

                const resFindRoom: any = await prisma.room.findMany({
                        where: {
                                OR: [
                                        {
                                                username: auth.username
                                        },
                                        {
                                                roomUsername: auth.username
                                        }
                                ]
                        }, select: {
                                UserId: {
                                        select: {
                                                User: true
                                        }, where: {
                                                NOT: {
                                                        User: {
                                                                username: auth.username
                                                        }
                                                }
                                        }
                                },
                                Message: {
                                        orderBy: {
                                                createdAt: 'desc'
                                        }, take: 1
                                }
                        }
                })

                const errors = []

                if (!resFindRoom) {
                        const message_ = throwMessage({
                                errors,
                                message: "Room not exist",
                                type: "error",
                        });

                        throw new UserInputError("ERROR", { message_ });
                }

                const chatUser = []

                await resFindRoom?.map((cu: any) => {
                        const User: any = cu?.UserId?.length >= 1 ? cu?.UserId[0]?.User : null;
                        const lastMessage: any = cu?.Message?.length >= 1 ? cu?.Message[0] : null

                        return chatUser.push({
                                User,
                                lastMessage: lastMessage ? lastMessage : {
                                        id: 0,
                                        text: "",
                                        status: "",
                                        media: "",
                                        createdAtIso: "",
                                        createdAt: ""
                                }
                        })
                })

                return chatUser
        }
}