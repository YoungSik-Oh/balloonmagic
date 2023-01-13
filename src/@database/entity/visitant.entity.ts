import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'VISITANT' })
export class Visitant {
  @PrimaryColumn({ name: 'VISIT_DAY', comment: '방문한 날' })
  visit_day: string;

  @Column({ name: 'COUNT', type: 'bigint', comment: '방문자 수' })
  count: number;
}
