import { validateOrReject, IsDate, IsOptional } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from "typeorm";

export class CommonEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    comment: "create at",
    type: "timestamp",
  })
  createdAt: Date;

  @Column({
    comment: "create by",
    nullable: true,
  })
  @IsOptional()
  createdBy: string;

  @Column({
    comment: "update time",
    type: "timestamp",
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    comment: "update by",
    nullable: true,
  })
  @IsOptional()
  updatedBy: string;

  @Column({
    comment: "delete time",
    type: "timestamp",
    nullable: true,
  })
  @DeleteDateColumn() //add timestamp automatically before soft delete
  @IsDate()
  @IsOptional()
  deletedAt: Date;

  @Column({
    comment: "deleter",
    nullable: true,
  })
  @IsOptional()
  deletedBy: string;

  @BeforeInsert() // add timestamp before inserting
  setCreatedAt() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  async validateBeforeInsert() {
    await validateOrReject(this);
  }

  @BeforeUpdate()
  async validateBeforeUpdate() {
    await validateOrReject(this, { skipMissingProperties: true });
  }
}
