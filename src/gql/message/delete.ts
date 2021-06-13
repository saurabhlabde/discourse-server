import { UserInputError } from "apollo-server-errors";
import { Arg, Ctx, ID, Mutation, Resolver } from "type-graphql";
import { PrismaType } from "../..";
import { throwMessage } from "../../utils/message";
import { userCheck } from "../../utils/userCheck";
import { validateAddMessage } from "../../utils/validation/addMessage";
import { Like, Message } from "../types";
import { DeleteInput } from './type'

@Resolver(of => Message)

export class DeleteMessageResolver {
        @Mutation((returns) => Message)
        async deleteMessage(@Arg("delete") deleteInput: DeleteInput, @Ctx() ctx: any) {
                const { auth } = await userCheck(ctx)

                const { id } = deleteInput

                const errors = []

                if (!id) {
                        const message_ = throwMessage({
                                errors,
                                message: "Invalid id",
                                type: "error",
                        });

                        throw new UserInputError("ERROR", { message_ });
                }

                const prisma: PrismaType = ctx.prisma

                const resMessage: any = await prisma.message.findFirst({
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

                        throw new UserInputError("ERROR", { message_ });
                }

                if (resMessage.userId !== auth.id) {
                        const message_ = throwMessage({
                                errors,
                                message: "Invalid user",
                                type: "error",
                        });

                        throw new UserInputError("ERROR", { message_ });
                }

                const resDeleteMessage: any = await prisma.message.delete({
                        where: {
                                id
                        }, include: {
                                User: true,
                                Like: true
                        }
                })

                if (!resDeleteMessage) {
                        const message_ = throwMessage({
                                errors,
                                message: "Message Delete failed",
                                type: "error",
                        });

                        throw new UserInputError("ERROR", { message_ });
                }

                await ctx.pubSub.publish("DELETE_MESSAGES");

                return resDeleteMessage
        }
}
