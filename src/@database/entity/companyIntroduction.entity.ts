import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity({ name: 'COMPANY_INTRODUCTION' })
export class CompanyIntroduction {
  @PrimaryColumn({ name: 'UUID' })
  @Generated('uuid')
  uuid: string;

  @Column({
    name: 'MAIN_TITLE',
    type: 'varchar',
    nullable: false,
    length: 50,
    comment: '제목',
  })
  main_title: string;

  @Column({
    name: 'SUB_TITLE',
    type: 'varchar',
    nullable: false,
    length: 50,
    comment: '부제목',
  })
  sub_title: string;

  @Column({
    name: 'CONTENTS',
    type: 'longtext',
    nullable: false,
    comment: '내용',
  })
  contents: string;

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
