import { Page } from "./page.type";
import { ClassType } from "type-graphql";
import { Field, Int, ObjectType } from "@nestjs/graphql";

export interface IResult<T> {
  code: number;
  message: string;
  data?: T;
}

export interface IResults<T> {
  code: number;
  message: string;
  data?: T[];
  page?: Page;
}

export function createResult<T>(ItemType: ClassType<T>): ClassType<IResult<T>> {
  @ObjectType()
  class Result implements IResult<T> {
    @Field(() => Int)
    code: number;
    @Field(() => String)
    message: string;
    @Field(() => ItemType, { nullable: true })
    data?: T;
  }
  return Result;
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
