import { Field, InputType } from 'type-graphql'


@InputType()
export class LoginInput {
        @Field()
        username: string

        @Field()
        password: string
}

@InputType()
export class RegisterInput {
        @Field()
        firstname: string

        @Field()
        lastname: string

        @Field()
        username: string

        @Field()
        email: string

        @Field()
        status: string

        @Field()
        password: string
}