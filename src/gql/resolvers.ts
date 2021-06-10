import { UserResolver } from './user/get'
import { LoginResolver } from '../gql/auth/login'
import { RegisterResolver } from '../gql/auth/register'
import { CreateMessageResolver } from '../gql/message/create'
import { MessageResolver } from '../gql/message/get'
import { ChatUsers } from '../gql/message/chatUsers'
import { OneUserResolver } from '../gql/user/one'
import { SearchResolver } from '../gql/user/search'
import { RecommendationResolver } from '../gql/user/recommendation'

export const resolvers = [
        UserResolver,
        LoginResolver,
        RegisterResolver,
        CreateMessageResolver,
        MessageResolver,
        ChatUsers,
        OneUserResolver,
        SearchResolver,
        RecommendationResolver
] as const
