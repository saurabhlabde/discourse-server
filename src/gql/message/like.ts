import { UserInputError } from "apollo-server-errors";
import { Arg, Ctx, ID, Mutation, Resolver } from "type-graphql";
import { PrismaType } from "../..";
import { throwMessage } from "../../utils/message";
import { userCheck } from "../../utils/userCheck";
import { validateAddMessage } from "../../utils/validation/addMessage";
import { Message } from "../types";
import { DeleteInput } from './type'

@Resolver(of => Message)

export class LikeMessageResolver {
        @Mutation((returns) => Message)
        async likeMessage(@Arg("like") deleteInput: DeleteInput, @Ctx() ctx: any) {
                const { auth } = await userCheck(ctx)

                const { id } = deleteInput

                const errors = []

                if (!id) {
                        const message_ = throwMessage({
                                errors,
                                message: "Invalid id",
                                type: "error",
                        });

                        throw new UserInputError("ERROR", { errors: message_ });
                }

                const prisma: PrismaType = ctx.prisma

                const resMessage = await prisma.message.findFirst({
                        where: {
                                id
                        }
                })

                if (!resMessage) {
                        const message_ = throwMessage({
                                errors,
                                message: "Message not exist",
                                type: "error",
                        });

                        throw new UserInputError("ERROR", { errors: message_ });
                }

                const resFindLike = await prisma.like.findFirst({
                        where: {
                                userId: auth.id
                        },
                })

                let resLike: any

                if (resFindLike) {

                        resLike = await prisma.message.update({
                                where: {
                                        id: resMessage.id,
                                },
                                data: {
                                        Like: {
                                                deleteMany: {
                                                        userId: auth.id
                                                }
                                        }
                                }, include: {
                                        User: true,
                                        Like: true,
                                }
                        })

                        if (!resLike) {
                                const message_ = throwMessage({
                                        errors,
                                        message: "Like remove failed",
                                        type: "error",
                                });

                                throw new UserInputError("ERROR", { errors: message_ });
                        }

                } else {
                        resLike = await prisma.message.update({
                                where: {
                                        id: resMessage.id
                                },
                                data: {
                                        Like: {
                                                create: {
                                                        userId: auth.id,
                                                        createdAtIso: new Date().toISOString()
                                                }
                                        }
                                }, include: {
                                        User: true,
                                        Like: true,
                                }
                        })

                        if (!resLike) {
                                const message_ = throwMessage({
                                        errors,
                                        message: "Like add failed",
                                        type: "error",
                                });

                                throw new UserInputError("ERROR", { errors: message_ });
                        }
                }

                await ctx.pubSub.publish("LIKE_MESSAGES");

                return resLike
        }
}
