import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Series } from "./series";

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
}
