import { CommonType } from '@/common/dto/common.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { ReducibleTimeType } from './common.type';

/**
 * Course
 */
@ObjectType()
export class CourseType extends CommonType {
  @Field({
    description: 'name',
  })
  name: string;

  @Field({
    description: 'desc',
    nullable: true,
  })
  desc: string;

  @Field({
    description: 'group',
  })
  group: string;

  @Field({
    description: 'coverUrl',
    nullable: true,
  })
  coverUrl: string;

  @Field({
    description: 'baseAbility',
  })
  baseAbility: string;

  @Field({
    description: 'limitNumber',
  })
  limitNumber: number;

  @Field({
    description: 'duration',
  })
  duration: number;

  @Field({
    description: 'reserveInfo',
    nullable: true,
  })
  reserveInfo: string;

  @Field({
    description: 'refundInfo',
    nullable: true,
  })
  refundInfo: string;

  @Field({
    description: 'otherInfo',
    nullable: true,
  })
  otherInfo: string;

  @Field(() => [ReducibleTimeType], {
    description: 'reducibleTime',
    nullable: true,
  })
  reducibleTime: ReducibleTimeType[];
}
