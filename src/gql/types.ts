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

        @Field(type => [Message])
        Message?: Message[]

        @Field(type => [Tokens])
        Tokens?: Tokens[]
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

        @Field(type => [Message])
        Message?: Message[]
}

@ObjectType()
export class Message {
        @Field()
        id: number

        @Field()
        text: string

        @Field()
        media: string

        @Field()
        status: string

        @Field()
        userId: number

        @Field()
        roomId: number

        @Field()
        createdAt: string

        @Field(of => User)
        User?: User
}
