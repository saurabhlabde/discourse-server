import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';
import * as bycrypt from "bcryptjs";
import { PrismaType } from '../../index'
import { RegisterInput } from './type'
import { User } from '../types'
import { throwMessage } from '../../utils/message'
import { generateToken } from '../../utils/jwtTokenGenerate'

Resolver(of => User)
export class RegisterResolver {

        @Mutation(returns => User)
        async createUser(@Arg('create') register: RegisterInput, @Ctx() ctx: any) {
                const { firstname, lastname, email, username, password, status, } = register

                const prisma: PrismaType = ctx.prisma

                const userExist: any = await prisma.user.findFirst({
                        where: {
                                username
                        }
                })

                let errors = [];

                if (userExist) {
                        const message_ = throwMessage({
                                errors,
                                message: "Username already exist please take anther username",
                                type: "error",
                        });

                        throw new UserInputError("EXIST", { message_ });
                }

                const emailExist: any = await prisma.user.findFirst({
                        where: {
                                email
                        }
                })

                if (userExist) {
                        const message_ = throwMessage({
                                errors,
                                message: "Username already exist please take anther username",
                                type: "error",
                        });

                        throw new UserInputError("EXIST", { message_ });
                }

                const passwordHash: string = await bycrypt.hash(password, 12);

                const res: any = await prisma.user.create({
                        data: {
                                firstname,
                                lastname,
                                username,
                                email,
                                status,
                                createdAtIso: new Date().toISOString(),
                                profileImage: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.GZ9KqCCy36KIdlIlYE7tuAHaHZ%26pid%3DApi&f=1",
                                password: passwordHash
                        },
                })

                if (res) {
                        const tokenUserInfo = {
                                id: res.id,
                                username: res.username
                        }

                        const token: string = generateToken(tokenUserInfo);

                        await prisma.tokens.create({
                                data: {
                                        userId: res.id,
                                        createdAtIso: new Date().toISOString(),
                                        token
                                }
                        })

                        const getUser: any = await prisma.user.findFirst({
                                where: {
                                        id: res.id
                                },
                                include: {
                                        Tokens: true
                                }
                        })

                        return getUser
                }
        }
}
