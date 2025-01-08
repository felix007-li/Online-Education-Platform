import { Field, InputType } from '@nestjs/graphql';

@InputType()
class OrderTimeInput {
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

@InputType()
export class ReducibleTimeInput {
  @Field({
    description: 'week',
  })
  week: string;

  @Field(() => [OrderTimeInput], {
    description: 'orderTime json',
  })
  orderTime: OrderTimeInput[];
}
