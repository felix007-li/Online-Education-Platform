import { Organization } from '@/modules/organization/models/organization.entity';
import { CommonEntity } from '@/common/entities/common.entity';
import { Course } from '@/modules/course/models/course.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CardType } from '@/common/constants/enmu';

/**
 * Consume Card
 */
@Entity('card')
export class Card extends CommonEntity {
  @Column({
    comment: 'Name',
    default: '',
  })
  name: string;

  @Column({
    comment: 'Type of Card',
    default: CardType.TIME,
  })
  @IsNotEmpty()
  type: string;

  @Column({
    comment: 'Number of classes',
    default: 0,
  })
  time: number;

  @Column({
    comment: 'Validity period (days)',
    default: 0,
  })
  validityDay: number;

  // Related courses
  @ManyToOne(() => Course, (course) => course.cards, {
    cascade: true,
  })
  course: Course;

  //Associated stores
  @ManyToOne(() => Organization, (org) => org.cards, {
    cascade: true,
  })
  org: Organization;
}
