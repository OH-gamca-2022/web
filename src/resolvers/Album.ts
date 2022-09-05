import { google } from "googleapis";
import { Resolver, Query } from "type-graphql";
import { getGoogleAuth } from "../utils/google-signin";

@Resolver()
export class AlbumResolver {
  @Query(() => Boolean)
  async loadAlbums() {
    const token = (await getGoogleAuth().getAccessToken()).token;
    const result = await fetch(
      "https://photoslibrary.googleapis.com/v1/albums",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    const formattedResult = await result.json();
    console.log(formattedResult);

    return true;
  }

  @Query(() => Boolean)
  async getPhotosFromAlbum() {
    const token = (await getGoogleAuth().getAccessToken()).token;
    const response = await fetch(
      "https://photoslibrary.googleapis.com/v1/mediaItems:search",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ albumId: "EDIT THIS", pageSize: 100 }),
      }
    );
    console.log(
      (await response.json()).mediaItems.map((item: any) => item.mediaMetadata)
    );
  }
}
