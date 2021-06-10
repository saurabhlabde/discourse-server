import { UserResolver } from './user/get'
import { LoginResolver } from '../gql/auth/login'
import { RegisterResolver } from '../gql/auth/register'
import { CreateMessageResolver } from '../gql/message/create'
import { MessageResolver } from '../gql/message/get'
import { ChatUsers } from '../gql/message/chatUsers'
import { OneUserResolver } from '../gql/user/one'

export const resolvers = [UserResolver,
        LoginResolver,
        RegisterResolver,
        CreateMessageResolver,
        MessageResolver, ChatUsers, OneUserResolver] as const
