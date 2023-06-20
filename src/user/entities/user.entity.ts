import { Exclude } from 'class-transformer';
import { LoginType } from 'src/common/constants';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('User')
export class UserEntity extends BaseEntity {
  // @ApiProperty({ description: '사용자 id', example: 1 })
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column('varchar', { length: 45, unique: true, nullable: false })
  username: string;

  @Column('varchar', {
    length: 45,
    unique: false,
    nullable: true,
  })
  nickname: string;

  @Column('varchar', { length: 256, nullable: true, select: false })
  password?: string;

  @Column('varchar', {
    name: 'appleUserId',
    length: 90,
    unique: true,
    nullable: true,
  })
  @Exclude()
  appleUserId: string;

  @Column('varchar', {
    name: 'googleUserId',
    length: 45,
    unique: true,
    nullable: true,
  })
  @Exclude()
  googleUserId: string;

  @Column('enum', {
    enum: LoginType,
    name: 'login_type',
    default: LoginType.EMAIL,
    comment: '로그인수단',
  })
  loginType: LoginType;
}
