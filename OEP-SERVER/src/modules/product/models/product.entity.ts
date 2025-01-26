import { ProductStatus } from "@/common/constants/enmu";
import { CommonEntity } from "@/common/entities/common.entity";
import { Card } from "@/modules/card/models/card.entity";
import { Organization } from "@/modules/organization/models/organization.entity";
import { IsNotEmpty, Min } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

/**
 * component
 */
@Entity("product")
export class Product extends CommonEntity {
  @Column({
    comment: "name",
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: "description",
    nullable: true,
  })
  desc: string;

  @Column({
    comment: "type",
    nullable: true,
  })
  type: string;

  @Column({
    comment: "type of product",
    default: ProductStatus.UN_LIST,
  })
  @IsNotEmpty()
  status: string;

  @Column({
    comment: "stock",
    default: 0,
  })
  stock: number;

  @Column({
    comment: "current stock",
    default: 0,
  })
  curStock: number;

  @Column({
    comment: "number of purchases",
    default: 0,
  })
  buyNumber: number;

  @Column({
    comment: "limit number of purchases",
    default: -1,
  })
  limitBuyNumber: number;

  @Column({
    comment: "cover image",
  })
  coverUrl: string;

  @Column({
    comment: "banner image",
  })
  bannerUrl: string;

  @Column({
    type: "float",
    comment: "original price",
  })
  @IsNotEmpty()
  @Min(0.01)
  originalPrice: number;

  @Column({
    type: "float",
    comment: "preferential price",
  })
  @IsNotEmpty()
  @Min(0.01)
  preferentialPrice: number;

  @ManyToOne(() => Organization, (org) => org.products, {
    cascade: true,
  })
  org: Organization;

  @ManyToMany(() => Card, { cascade: true })
  @JoinTable({
    // need to specify the name of the join table which is the third table has relation with the two tables
    name: "product_card",
  })
  cards: Card[];
}
