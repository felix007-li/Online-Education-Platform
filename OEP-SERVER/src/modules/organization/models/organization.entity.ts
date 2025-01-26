import { Course } from './../../course/models/course.entity';
import { OrgImage } from './../../orgImage/models/orgImage.entity';
import { IsNotEmpty } from 'class-validator';
import { CommonEntity } from '@/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Card } from '@/modules/card/models/card.entity';
import { Product } from '@/modules/product/models/product.entity';

/**
 * Organization
 */
@Entity('organization')
export class Organization extends CommonEntity {
  @Column({
    comment: 'license',
    nullable: true,
  })
  // @IsNotEmpty()
  businessLicense: string;

  @Column({
    comment: 'identityCardFrontImg',
    nullable: true,
  })
  identityCardFrontImg: string;

  @Column({
    comment: 'identityCardBackImg',
    nullable: true,
  })
  identityCardBackImg: string;

  @Column({
    type: 'text',
    comment: 'tags',
    nullable: true,
  })
  tags: string;

  @Column({
    type: 'text',
    comment: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    comment: 'name',
    nullable: true,
    default: '',
  })
  name: string;

  @Column({
    comment: 'logo',
    nullable: true,
  })
  logo: string;

  @Column({
    comment: 'address',
    nullable: true,
  })
  address: string;

  @Column({
    comment: 'longitude',
    nullable: true,
  })
  longitude: string;

  @Column({
    comment: 'latitude',
    nullable: true,
  })
  latitude: string;

  @Column({
    comment: 'tel',
    nullable: true,
  })
  tel: string;

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForFront, {
    cascade: true, // create cascade
  })
  orgFrontImg?: OrgImage[]; // OneToMany: the relationship between organization and photo is OneToMany

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForRoom, {
    cascade: true,
  })
  orgRoomImg?: OrgImage[];

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForOther, {
    cascade: true,
  })
  orgOtherImg?: OrgImage[];

  @OneToMany(() => Course, (course) => course.org)
  courses: Course[];

  @OneToMany(() => Card, (card) => card.org)
  cards: Card[];

  @OneToMany(() => Product, (product) => product.org)
  products: Product[];
}
