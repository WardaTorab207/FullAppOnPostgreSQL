import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";
import { GenreSeries } from "./genreSeries";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true , type: "varchar"})
  name!: string;

  @Column({ nullable: true, type: "varchar" })
  description!: string;

  @OneToMany(() => GenreSeries, (genreSeries) => genreSeries.genre)
  genreSeries!: GenreSeries[];
}
