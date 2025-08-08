import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import {Stream } from './stream';

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

  @OneToMany(() => Stream, (stream) => stream.episode)
streams!: Stream[];
}
