import { UserInputError } from "apollo-server-errors";
import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { PrismaType } from '../../index'
import { throwMessage } from "../../utils/message";
import { userCheck } from "../../utils/userCheck";
import { User } from '../types'
import { UserInput } from "./type";

@Resolver(of => User)
export class OneUserResolver {
        @Query(returns => User)
        async getOneUser(@Arg('user') userInput: UserInput, @Ctx() ctx: any) {
                const { auth } = await userCheck(ctx)

                const { username } = userInput

                if (!username) {
                        const message_ = throwMessage({
                                errors: [],
                                message: "User not found",
                                type: "error"
                        })

                        throw new UserInputError('NOT_FOUND', { message_ })
                }

                const prisma: PrismaType = ctx.prisma

                const res: any = await prisma.user.findFirst({
                        where: {
                                username
                        }
                })

                return res
        }
}