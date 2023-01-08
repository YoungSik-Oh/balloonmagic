import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';

// concert - 공연
// planning - 기획
// education - 교육
// etc - 그 외

export type BaordCategory = 'concert' | 'planning' | 'education' | 'etc';

@Entity({ name: 'BOARD' })
export class Board {
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
  category: 'concert' | 'planning' | 'education' | 'etc';

  @Column({
    name: 'TITLE',
    type: 'varchar',
    nullable: false,
    comment: '게시글 제목',
  })
  title: string;

  @Column({ name: 'CONTENTS', type: 'longtext', comment: '게시글 내용' })
  contents: string;

  @Column({ name: 'HIT', type: 'bigint', unsigned: true, comment: '조회수' })
  hit: number;

  @Column({
    name: 'FILE',
    type: 'longtext',
    nullable: true,
    comment: '첨부파일 이름',
    select: false,
  })
  file: string;

  @Column({
    name: 'FILE_REGIST_AT',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '파일 등록 일자',
    select: false,
  })
  file_registAt: Date;

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

  @ManyToOne(() => User, (user) => user.boards, {
    nullable: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    // lazy: true,
  })
  @JoinColumn({ name: 'writer_id', referencedColumnName: 'uuid' })
  writer: User;

  @RelationId((board: Board) => board.writer)
  writerId: number;
}
