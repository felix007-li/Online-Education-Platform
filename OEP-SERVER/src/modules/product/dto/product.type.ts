import { CommonType } from "@/common/dto/common.type";
import { CardType } from "@/modules/card/dto/card.type";
import { OrganizationType } from "@/modules/organization/dto/organization.type";
import { Field, ObjectType } from "@nestjs/graphql";

/**
 * product
 */
@ObjectType()
export class ProductType extends CommonType {
  @Field({
    description: "name",
    nullable: true,
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
    description: "distance",
  })
  distance?: string;

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
    description: "current stock",
  })
  curStock: number;

  @Field({
    description: "number of purchases",
  })
  buyNumber: number;

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

  @Field(() => OrganizationType, {
    description: "organization",
  })
  org: OrganizationType;

  @Field(() => [CardType], {
    description: "cards",
    nullable: true,
  })
  cards?: CardType[]; // ?: cards is optional
}
