import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user.js";
import { Genre } from "../entities/genre.js";
import {File} from "../entities/file.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5550,
  username: "postgres",
  password: "nsardaarb,1067",
  database: "ipvt_db",
  synchronize: true,
  logging: false,
  entities: [User,Genre,File],
  migrations: [],
  subscribers: [],
});



