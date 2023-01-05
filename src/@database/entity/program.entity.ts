import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity({ name: 'PROGRAM' })
export class Program {
  @PrimaryColumn({ name: 'UUID' })
  @Generated('uuid')
  uuid: string;

  @Column({
    name: 'CATEGORY',
    type: 'varchar',
    nullable: false,
    length: 30,
    comment: '게시판 카테고리',
  })
  category: 'extreme' | 'carnival' | 'store';

  @Column({
    name: 'TITLE',
    type: 'varchar',
    nullable: false,
    comment: '게시글 제목',
  })
  title: string;

  @Column({ name: 'CONTENTS', type: 'longtext', comment: '게시글 내용' })
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
