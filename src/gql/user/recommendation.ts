import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { PrismaType } from '../../index'
import { userCheck } from "../../utils/userCheck";
import { User } from '../types'

@Resolver(of => User)
export class RecommendationResolver {
        @Query(returns => [User])
        async recommendation(@Ctx() ctx: any) {
                const { auth } = await userCheck(ctx)


                const prisma: PrismaType = ctx.prisma

                const res: any = await prisma.user.findMany({
                        where: {
                                NOT: [
                                        {
                                                id: auth.id
                                        }
                                ]
                        }
                })

                return res
        }
}
