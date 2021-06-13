import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
        @Field()
        id: number

        @Field()
        firstname: string

        @Field()
        lastname: string

        @Field()
        username: string

        @Field()
        email: string

        @Field()
        phoneNumber?: number

        @Field()
        profileImage: string

        @Field()
        status: string

        @Field()
        password: string

        @Field()
        createdAt: string

        @Field()
        createdAtIso: string

        @Field(type => [Message])
        Message?: Message[]

        @Field(type => [Tokens])
        Tokens?: Tokens[]

        @Field(type => [Like])
        Like?: Like[]

        @Field(type => [UserId])
        UserId?: UserId[]
}

@ObjectType()
export class Tokens {
        @Field()
        id: number

        @Field()
        userId: number

        @Field()
        token: string

        @Field()
        createdAt: string

        @Field()
        createdAtIso: string
}

@ObjectType()
export class Room {
        @Field()
        id: number

        @Field()
        username: string

        @Field()
        roomUsername: string

        @Field()
        createdAt: string

        @Field()
        createdAtIso: string

        @Field(type => [UserId])
        UserId?: UserId[]

        @Field(type => [Message])
        Message?: Message[]
}

@ObjectType()
export class UserId {
        @Field()
        id: number

        @Field()
        userId: number

        @Field()
        roomId: number
}


@ObjectType()
export class Like {
        @Field()
        id: number

        @Field()
        userId: number

        @Field()
        createdAtIso: string

        @Field()
        createdAt: string

        @Field()
        messageId?: number
}

@ObjectType()
export class Message {
        @Field()
        id: number

        @Field()
        text?: string

        @Field()
        media?: string

        @Field()
        status: string

        @Field()
        userId: number

        @Field()
        roomId: number

        @Field(type => [Like])
        Like?: Like[]

        @Field()
        createdAt: string

        @Field()
        createdAtIso: string

        @Field(of => User)
        User?: User
}
