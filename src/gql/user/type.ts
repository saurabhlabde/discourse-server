import { Field, InputType } from "type-graphql";


@InputType()
export class UserInput {
        @Field()
        username: string

}

@InputType()
export class SearchInput {
        @Field()
        query: string
}

