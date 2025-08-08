import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true , type: "varchar"})
  name!: string;

  @Column({ nullable: true, type: "varchar" })
  description!: string;
}
