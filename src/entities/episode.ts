import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Season } from "./season";
import { File } from "./file";

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type:"varchar"})
  name!: string;

  @Column({type:"varchar"})
  description!: string;

  @ManyToOne(() => File, { cascade: true, eager: true })
  @JoinColumn({ name: "thumbnail_id" })
  thumbnail!: File;

  @ManyToOne(() => Season, (season) => season.episodes)
  @JoinColumn({ name: "season_id" })
  season!: Season;
}
