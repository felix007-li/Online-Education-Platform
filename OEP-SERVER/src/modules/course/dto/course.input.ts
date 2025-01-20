import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ReducibleTimeInput } from './common.input';

@InputType()
export class CourseInput {
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
    description: 'baseAbility',
  })
  baseAbility: string;

  @Field({
    description: 'coverUrl',
  })
  coverUrl: string;

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

  @Field(() => [ReducibleTimeInput], {
    description: 'reducibleTime',
    nullable: true,
  })
  reducibleTime: ReducibleTimeInput[];

//   @Field(() => [String], {
//     description: 'teachers',
//     nullable: true,
//   })
//   teachers: string[];
}

@InputType()
export class PartialCourseInput extends PartialType(CourseInput) {}
