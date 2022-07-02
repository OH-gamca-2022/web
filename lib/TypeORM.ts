import { DataSource } from "typeorm";
import { Category } from "../src/entities/Category";
import { Discipline } from "../src/entities/Discipline";
import { Post } from "../src/entities/Post";
import { Tag } from "../src/entities/Tag";
import { User } from "../src/entities/User";

let mainDataSource: DataSource;
export const getDataSource = () => {
  if (mainDataSource) {
    if (!mainDataSource.isInitialized) {
      mainDataSource.initialize();
    }
    return mainDataSource;
  } else {
    mainDataSource = new DataSource({
      type: "postgres",
      database: "OH-gamca-2022",
      entities: [User, Post, Tag],
      synchronize: true,
    });
    mainDataSource
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
