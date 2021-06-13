import { Field, InputType, ObjectType } from "type-graphql";
import { Message, User } from "../types";


@InputType()
export class CreateMessageInput {
        @Field()
        roomUsername: string

        @Field({ nullable: true })
        text?: string

        @Field({ nullable: true })
        media?: string
}

@ObjectType()
export class RoomUsersType {
        @Field(type => User)
        User: User

        @Field(type => Message)
        lastMessage?: Message
}

@InputType()
export class MessageInput {
        @Field()
        roomUsername: string
}

@InputType()
export class MessageSubInput {
        @Field()
        username: string

        @Field()
        roomUsername: string
}


@InputType()
export class DeleteInput {
        @Field()
        id: number
}
