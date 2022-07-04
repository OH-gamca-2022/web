import { DataSource } from "typeorm";
import { Post } from "../src/entities/Post";
import { Tag } from "../src/entities/Tag";
import { User } from "../src/entities/User";

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
      database: "OH-gamca-2022",
      entities: [User, Post, Tag],
      synchronize: true,
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
