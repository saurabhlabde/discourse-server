import { Query, Resolver, Ctx } from "type-graphql";
import { PrismaType } from '../../index'
import { userCheck } from "../../utils/userCheck";
import { User } from '../types'

@Resolver(of => User)
export class UserResolver {
        @Query(returns => User)
        async getUser(@Ctx() ctx: any) {
                const { auth } = await userCheck(ctx)

                const prisma: PrismaType = ctx.prisma

                const res: any = await prisma.user.findFirst({
                        where: {
                                id: auth.id
                        }
                })

                return res
        }
}