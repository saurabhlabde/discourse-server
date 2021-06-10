import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { PrismaType } from '../../index'
import { userCheck } from "../../utils/userCheck";
import { User } from '../types'
import { SearchInput } from "./type";

@Resolver(of => User)
export class SearchResolver {
        @Query(returns => [User])
        async search(@Arg('search') searchInput: SearchInput, @Ctx() ctx: any) {
                const { auth } = await userCheck(ctx)

                const { query } = searchInput

                const prisma: PrismaType = ctx.prisma

                const res: any = await prisma.user.findMany({
                        where: {
                                OR: [
                                        {
                                                username: query,
                                        }
                                        , {
                                                firstname: query,
                                        }, {
                                                lastname: query,
                                        }
                                ]
                        }
                })

                return res
        }
}

