import { Column, Entity, PrimaryColumn } from 'typeorm';

// 주요이력
@Entity({ name: 'MAIN_HISTORY' })
export class MainHistory {
  @PrimaryColumn({ name: 'CITY', comment: '도시' })
  city: string;

  @Column({ name: 'LOCATION', type: 'longtext', comment: '지역' })
  location: string;
}
