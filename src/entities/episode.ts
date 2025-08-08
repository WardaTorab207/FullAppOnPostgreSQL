import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { Season } from "./season";
import { File } from "./file";
import { Stream } from "./stream"

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

  @OneToMany(() => Stream, (stream) => stream.episode)
streams!: Stream[];
}
