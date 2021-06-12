import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server';
import * as bycrypt from "bcryptjs";
import { PrismaType } from '../../index'
import { LoginInput } from './type'
import { User } from '../types'
import { throwMessage } from '../../utils/message'
import { generateToken } from '../../utils/jwtTokenGenerate'
import { validateLoginInput } from '../../utils/validation/user';

Resolver(of => User)
export class LoginResolver {

        @Mutation(returns => User)
        async login(@Arg('login') register: LoginInput, @Ctx() ctx: any) {
                const { username, password } = register


                const { valid, errors } = validateLoginInput({
                        username,
                        password,
                });

                if (!valid) {
                        throw new UserInputError("ERROR", { errors });
                }

                const prisma: PrismaType = ctx.prisma

                const userExist: any = await prisma.user.findFirst({
                        where: {
                                username
                        }
                })

                let errorN = []

                if (!userExist) {
                        const message = throwMessage({
                                errors,
                                message: "Invalid login",
                                type: "error",
                        });

                        throw new UserInputError("ERROR", { errors: message });
                }


                const matchPassword: boolean = await bycrypt.compare(password, userExist.password);

                if (!matchPassword) {
                        const message = throwMessage({
                                errors,
                                message: "Login failed, invalid login details",
                                type: "error",
                        });

                        throw new UserInputError("NOT_FOUND", { errors: message });
                }

                const tokenUserInfo = {
                        id: userExist.id,
                        username: userExist.username
                }

                const token: string = generateToken(tokenUserInfo);

                await prisma.tokens.upsert({
                        where: {
                                userId: userExist.id
                        },
                        create: {
                                userId: userExist.id,
                                createdAtIso: new Date().toISOString(),
                                token
                        },
                        update: {
                                createdAtIso: new Date().toISOString(),
                                token,
                        }
                })

                const getUser: any = await prisma.user.findFirst({
                        where: {
                                id: userExist.id
                        },
                        include: {
                                Tokens: true
                        }
                })

                return getUser
        }
}
