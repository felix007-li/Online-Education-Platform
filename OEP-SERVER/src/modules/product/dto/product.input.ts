import { Field, InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class ProductInput {
  @Field({
    description: "name",
  })
  name: string;

  @Field({
    description: "description",
    nullable: true,
  })
  desc: string;

  @Field({
    description: "status",
    nullable: true,
  })
  status: string;

  @Field({
    description: "type",
    nullable: true,
  })
  type: string;

  @Field({
    description: "stock",
  })
  stock: number;

  @Field({
    description: "limit number of purchases",
  })
  limitBuyNumber: number;

  @Field({
    description: "cover image",
  })
  coverUrl: string;

  @Field({
    description: "banner image",
  })
  bannerUrl: string;

  @Field({
    description: "original price",
  })
  originalPrice: number;

  @Field({
    description: "preferential price",
  })
  preferentialPrice: number;

  @Field(() => [String], {
    description: "cards",
  })
  cards: string[];
}

@InputType()
export class PartialProductInput extends PartialType(ProductInput) {}
