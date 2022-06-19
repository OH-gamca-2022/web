import { DataSource } from "typeorm";
import { User } from "../src/entities/User";

const mainDataSource = new DataSource({
  type: "postgres",
  database: "OH-gamca-2022",
  entities: [User],
  synchronize: true,
});

export const getDataSource = () => {
  if (mainDataSource.isInitialized) {
    return mainDataSource;
  } else {
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
