import { Query, Resolver, Ctx } from "type-graphql";
import { PrismaType } from '../../index'
import { User } from '../types'

@Resolver(of => User)
export class UserResolver {
        @Query(returns => [User])
        async getUser(@Ctx() ctx: any) {
                const prisma: PrismaType = ctx.prisma

                const res: any = await prisma.user.findMany()

                return res
        }
}