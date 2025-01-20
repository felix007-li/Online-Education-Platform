import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderTimeType {
  @Field({
    description: 'startTime',
  })
  startTime: string;

  @Field({
    description: 'endTime',
  })
  endTime: string;

  @Field({
    description: 'key',
  })
  key: number;
}

@ObjectType()
export class ReducibleTimeType {
  @Field({
    description: 'week',
  })
  week: string;

  @Field(() => [OrderTimeType], {
    description: 'orderTime json',
  })
  orderTime: OrderTimeType[];
}
