import { UserInputError } from "apollo-server";
import { checkAuth } from "./authCheck";
import { throwMessage } from "./message";
import { PrismaType } from '../index'

export const userCheck = async (ctx: any) => {

        const user: any = checkAuth(ctx);

        const errors = [];

        if (!user) {
                const message_ = throwMessage({
                        errors: errors,
                        message: "Invalid user login again",
                        type: "error",
                });

                throw new UserInputError("NOT_FOUND", { message_ });
        }

        const prisma: PrismaType = ctx.prisma

        const auth: any = await prisma.user.findFirst({
                where: {
                        id: user.id
                }
        });

        if (!auth) {
                const message_ = throwMessage({
                        errors: errors,
                        message: "Invalid user login again",
                        type: "error",
                });

                throw new UserInputError("NOT_FOUND", { message_ });
        }

        return { auth };
};

