import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { File } from "./file.js";
import { GenreSeries } from "./genreSeries.js";
import {Season } from "./season.js";

@Entity()
export class Series {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

 @ManyToOne(() => File, { nullable: true, cascade: true, onDelete: "SET NULL" })
@JoinColumn({ name: "trailer_id" })
trailer!: File | null;

@ManyToOne(() => File, { nullable: true, cascade: true, onDelete: "SET NULL" })
@JoinColumn({ name: "thumbnail_id" })
thumbnail!: File | null;

@OneToMany(() => GenreSeries, (genreSeries) => genreSeries.series)
genreSeries!: GenreSeries[];

@OneToMany(() => Season, (season) => season.series)
seasons!: Season[];
}
