import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  filename!: string;

  @Column({ type: "varchar" })
  path!: string;

  @Column({ type: "varchar" })
  mimetype!: string;

  @Column({ type: "int" })
  size!: number;
}
