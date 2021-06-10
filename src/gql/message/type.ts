import { Field, InputType, ObjectType } from "type-graphql";
import { Message, User } from "../types";


@InputType()
export class CreateMessageInput {
        @Field()
        roomUsername: string

        @Field()
        text?: string

        @Field()
        media?: string
}

@ObjectType()
export class RoomUsersType {
        @Field(type => User)
        User: User

        @Field(type => Message)
        lastMessage: Message
}

@InputType()
export class MessageInput {
        @Field()
        roomUsername: string
}