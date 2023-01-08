import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity({ name: 'INQUIRE' })
export class Inquire {
  @PrimaryColumn({ name: 'UUID' })
  @Generated('uuid')
  uuid: string;

  @Column({
    name: 'EMAIL',
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: '이메일',
  })
  email: string;

  @Column({
    name: 'REGIST_AT',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '등록 일자',
  })
  registAt: Date;

  @Column({
    name: 'UPDATE_AT',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '수정 일자',
  })
  updateAt: Date;
}
