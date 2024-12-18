import { Field, Int, ObjectType } from "@nestjs/graphql";

export interface IResult<T> {
  code: number;
  message: string;
  data?: T;
}

@ObjectType()
export class Result {
  @Field(() => Int)
  code: number;
  @Field(() => String, { nullable: true })
  message?: string;
  @Field(() => String, { nullable: true })
  data?: string;
}
