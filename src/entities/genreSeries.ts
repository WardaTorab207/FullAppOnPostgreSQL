import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "./genre";
import { Series } from "./series";

@Entity()
export class GenreSeries {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Genre, (genre) => genre.genreSeries, { onDelete: "CASCADE" })
  genre!: Genre;

  @ManyToOne(() => Series, (series) => series.genreSeries, { onDelete: "CASCADE" })
  
  series!: Series;
}
