import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar"})
  firstName!: string;

  @Column({ type: "varchar"})
  lastName!: string;

  @Column({ unique: true , type: "varchar"})
  email!: string;

  @Column({ type: "varchar"})
  password!: string;
}
