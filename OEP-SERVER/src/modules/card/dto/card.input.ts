import { Field, InputType } from '@nestjs/graphql';

/**
 * 消费卡
 */
@InputType('CardInput')
export class CardInput {
  @Field({
    description: 'Name',
  })
  name: string;

  @Field({
    description: 'Type of Card Frequency：time Duration：duration',
  })
  type: string;

  @Field({
    description: 'Number of classes',
    nullable: true,
  })
  time: number;

  @Field({
    description: 'Validity period (days)',
  })
  validityDay: number;
}
