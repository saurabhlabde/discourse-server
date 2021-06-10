import { UserResolver } from '../gql/users/get'
import { LoginResolver } from '../gql/auth/login'
import { RegisterResolver } from '../gql/auth/register'
import { CreateMessageResolver } from '../gql/message/create'
import { MessageResolver } from '../gql/message/get'

export const resolvers = [UserResolver,
        LoginResolver,
        RegisterResolver,
        CreateMessageResolver,
        MessageResolver] as const
