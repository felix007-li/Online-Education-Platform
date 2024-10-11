import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        comment: 'nickname',
        default: '',
    })
    @IsNotEmpty()
    name: string;

    @Column({
        comment: 'description',
        default: '',
    })
    desc: string;

    @Column({
        comment: 'mobile number',
        nullable: true,
    })
    tel: string;

    @Column({
        comment: 'avatar',
        nullable: true,
    })
    avatar: string;

    @Column({
        comment: 'verification code',
        nullable: true,
    })
    code: string;
    
    @Column({
        comment: 'code create time at',
        nullable: true,
    })
    codeCreateTimeAt: Date;
}