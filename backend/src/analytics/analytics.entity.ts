import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SearchAnalytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  query: string;

  @Column()
  count: number;
}
