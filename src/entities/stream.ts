import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Episode } from "./episode";
import { User } from "./user";

@Entity()
export class Stream {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type:'varchar'})
  time!: string;

  @ManyToOne(() => Episode, (episode) => episode.streams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "episode_id" })
  episode!: Episode;

  @ManyToOne(() => User, (user) => user.streams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "user_id" })
  user!: User;
}
