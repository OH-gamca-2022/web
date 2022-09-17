import path from "path";
import { DataSource } from "typeorm";
import { Album } from "../src/entities/Album";
import { CalendarEvent } from "../src/entities/CalendarEvent";
import { Category } from "../src/entities/Category";
import { Discipline } from "../src/entities/Discipline";
import { Post } from "../src/entities/Post";
import { Tag } from "../src/entities/Tag";
import { User } from "../src/entities/User";
import { __prod__ } from "../src/utils/constants";

let mainDataSource: DataSource;
export const getDataSource = async () => {
  if (mainDataSource) {
    if (!mainDataSource.isInitialized) {
      await mainDataSource.initialize();
    }
    return mainDataSource;
  } else {
    mainDataSource = new DataSource({
      type: "postgres",
      database: process.env.DB_NAME,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      entities: [User, Post, Tag, CalendarEvent, Discipline, Category, Album],
      migrations: [path.join(__dirname, "./migrations/*")],
      synchronize: !__prod__,
    });
    await mainDataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been initialized");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
    return mainDataSource;
  }
};
