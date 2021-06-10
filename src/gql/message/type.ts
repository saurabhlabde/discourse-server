import { Field, InputType, ObjectType } from "type-graphql";


@InputType()
export class CreateMessageInput {
        @Field()
        roomUsername: string

        @Field()
        text?: string

        @Field()
        media?: string
}


@InputType()
export class MessageInput {
        @Field()
        roomUsername: string
}
