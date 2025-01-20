import { CommonEntity } from '@/common/entities/common.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

/**
 * 组件
 */
@Entity('student')
export class Student extends CommonEntity {
  @Column({
    comment: 'nickname',
    default: '',
  })
  name: string;

  @Column({
    comment: 'tel',
    nullable: true,
  })
  tel: string;

  @Column({
    comment: 'avatar',
    nullable: true,
  })
  avatar: string;

  @Column({
    comment: 'password',
  })
  password: string;

  @Column({
    comment: 'accout',
  })
  account: string;

  @Column({
    comment: 'openid',
    nullable: true,
  })
  openid?: string;
}
