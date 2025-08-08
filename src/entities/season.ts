import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { Series } from "./series";
import { Episode }  from "./episode";

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar"})
  title!: string;

  @Column({ nullable: true, type: "varchar" })
  description!: string;

  @ManyToOne(() => Series, (series) => series.seasons, { onDelete: "CASCADE" })
  @JoinColumn({ name: "seriesId" })
  series!: Series;

  @OneToMany(() => Episode, (episode) => episode.season)
episodes!: Episode[];
}
