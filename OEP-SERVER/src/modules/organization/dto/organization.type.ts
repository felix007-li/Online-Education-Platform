import { CommonType } from '@/common/dto/common.type';
import { CourseType } from '@/modules/course/dto/course.type';
import { OrgImageType } from '@/modules/orgImage/dto/orgImage.output';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 *  Organization
 */
@ObjectType()
export class OrganizationType extends CommonType {
  @Field({
    description: 'license',
    nullable: true,
  })
  businessLicense: string;

  @Field({
    description: 'identityCardFrontImg',
  })
  identityCardFrontImg: string;

  @Field({
    description: 'identityCardBackImg',
  })
  identityCardBackImg: string;

  @Field({
    description: 'tags',
    nullable: true,
  })
  tags: string;

  @Field({
    description: 'description',
    nullable: true,
  })
  description: string;

  @Field({
    description: 'name',
    nullable: true,
  })
  name: string;

  @Field({
    description: 'logo',
    nullable: true,
  })
  logo: string;

  @Field({
    description: 'longitude',
    nullable: true,
  })
  longitude: string;

  @Field({
    description: 'latitude',
    nullable: true,
  })
  latitude: string;

  @Field({
    description: 'address',
    nullable: true,
  })
  address?: string;

  @Field({
    description: 'tel',
    nullable: true,
  })
  tel: string;

  @Field(() => [OrgImageType], { nullable: true, description: 'orgFrontImg' })
  orgFrontImg?: OrgImageType[];

  @Field(() => [OrgImageType], { nullable: true, description: 'orgRoomImg' })
  orgRoomImg?: OrgImageType[];

  @Field(() => [OrgImageType], { nullable: true, description: 'orgOtherImg' })
  orgOtherImg?: OrgImageType[];

  @Field(() => [CourseType], { nullable: true, description: 'courses' })
  courses?: CourseType[];
}
