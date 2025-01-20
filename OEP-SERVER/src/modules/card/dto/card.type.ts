import { Field, ObjectType } from '@nestjs/graphql';
import { CourseType } from '../../course/dto/course.type';

/**
 * Consume Card
 */
@ObjectType('CardType')
export class CardType {
  @Field({
    description: 'id',
  })
  id: string;

  @Field({
    description: 'Name',
  })
  name: string;

  @Field({
    description: `Type of card 
     FREQUENCY = "time",
    DURATION = "duration"`,
  })
  type: string;

  @Field({
    description: 'Number of classes',
  })
  time: number;

  @Field({
    description: 'Validity period (days)',
  })
  validityDay: number;

  @Field(() => CourseType, {
    description: 'Course',
  })
  course: CourseType;
}
