import { Organization } from '@/modules/organization/models/organization.entity';
import { CommonEntity } from '@/common/entities/common.entity';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ReducibleTimeType } from '../dto/common.type';
import { Card } from '@/modules/card/models/card.entity';

/**
 * Course
 */
@Entity('course')
export class Course extends CommonEntity {
  @Column({
    comment: 'name',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: 'desc',
    nullable: true,
    type: 'text',
  })
  desc: string;

  @Column({
    comment: 'group',
  })
  @IsNotEmpty()
  group: string;

  @Column({
    comment: 'baseAbility',
  })
  @IsNotEmpty()
  baseAbility: string;

  @Column({
    comment: 'limitNumber',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  limitNumber: number;

  @Column({
    comment: 'duration',
  })
  @IsNotEmpty()
  duration: number;

  @Column({
    comment: 'reserveInfo',
    nullable: true,
  })
  reserveInfo: string;

  @Column({
    comment: 'refundInfo',
    nullable: true,
  })
  refundInfo: string;

  @Column({
    comment: 'otherInfo',
    nullable: true,
  })
  otherInfo: string;

  @Column({
    comment: 'coverUrl',
    nullable: true,
  })
  coverUrl: string;

  @Column('simple-json', {
    comment: 'reducibleTime',
    nullable: true,
  })
  reducibleTime: ReducibleTimeType[];

  @ManyToOne(() => Organization, (org) => org.courses, {
    cascade: true,
  })
  org: Organization;

  @OneToMany(() => Card, (org) => org.course)
  cards: Card;
}
