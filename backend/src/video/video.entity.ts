import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('videos')
export class Video {
  @PrimaryColumn()
  videoId: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  thumbnailUrl: string;

  @Column('timestamp', { nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  publishedAt: Date;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  commentCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
