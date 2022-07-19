import { Resolver, Query } from "type-graphql";
import fs from "fs";
import { oauth2Client } from "../utils/google-signin";
import { google } from "googleapis";

@Resolver()
export class EventResolver {
  @Query(() => Boolean)
  async getEvents() {
    const restoredInfo = JSON.parse(
      fs.readFileSync("./galleryInfo.json", "utf8")
    );
    oauth2Client.setCredentials({ refresh_token: restoredInfo.refreshToken });
    console.log(
      (
        await google
          .calendar({ version: "v3", auth: oauth2Client })
          .calendarList.list()
      ).data.items
    );

    return true;
  }
}
