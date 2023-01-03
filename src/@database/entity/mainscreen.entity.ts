import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

// -- signpost - 간판글
// -- youtube - 유튜브
// -- instartgram  - 인스타 그램
// -- facebook - 페이스북

@Entity({ name: 'MAIN_SCREEN' })
export class MainScreen {
  @PrimaryColumn({ name: 'UUID' })
  @Generated('uuid')
  uuid: string;

  @Column({
    name: 'SIGNPOST',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '간판글',
  })
  sign_post: string;

  @Column({
    name: 'YOUTUBE',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '유튜브',
  })
  youtube: string;

  @Column({
    name: 'INSTARGRAM',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '인스타그램',
  })
  instargram: string;

  @Column({
    name: 'FACEBOOK',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '페이스북',
  })
  facebook: string;
}
