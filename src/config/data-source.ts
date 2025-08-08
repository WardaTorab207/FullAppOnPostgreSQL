import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user.js";
import { Genre } from "../entities/genre.js";
import {File} from "../entities/file.js";
import {Series} from "../entities/series.js";
import { GenreSeries} from "../entities/genreSeries.js";
import {Season} from "../entities/season.js";
import { Episode } from "../entities/episode.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5550,
  username: "postgres",
  password: "nsardaarb,1067",
  database: "ipvt_db",
  synchronize: true,
  logging: false,
  entities: [User,Genre,File,Series,GenreSeries,Season,Episode],
  migrations: [],
  subscribers: [],
});



