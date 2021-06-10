import { UserResolver } from '../gql/users/get'
import { LoginResolver } from '../gql/auth/login'
import { RegisterResolver } from '../gql/auth/register'

export const resolvers = [UserResolver, LoginResolver, RegisterResolver] as const