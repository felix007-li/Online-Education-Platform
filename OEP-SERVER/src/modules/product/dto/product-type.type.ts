import { Field, ObjectType } from "@nestjs/graphql";

/**
 * type of product
 */
@ObjectType()
export class ProductTypeType {
  @Field({
    description: "key",
  })
  key: string;

  @Field({
    description: "title",
  })
  title: string;
}
