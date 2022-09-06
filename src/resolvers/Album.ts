import { google } from "googleapis";
import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
} from "type-graphql";
import { getDataSource } from "../../lib/TypeORM";
import { Album } from "../entities/Album";
import { Photo } from "../entities/Photo";
import { getGoogleAuth } from "../utils/google-signin";

@ObjectType()
export class GoogleAlbum {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field()
  coverPhotoBaseUrl!: string;
}

const getAllPhotosFromAlbum = async (albumId: string) => {
  const token = (await getGoogleAuth().getAccessToken()).token;
  const list = [];
  var response: any = {};
  do {
    // request to get the maximum amout of photos in the album (100 is the maximum)
    response = await (
      await fetch("https://photoslibrary.googleapis.com/v1/mediaItems:search", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-type": "application/json",
        },
        // if we have the nextPageToken from previous request, use it as "pageToken" param
        body: JSON.stringify(
          response.nextPageToken
            ? { albumId, pageSize: 100, pageToken: response.nextPageToken }
            : { albumId, pageSize: 100 }
        ),
      })
    ).json();
    if (!response.mediaItems) break;
    list.push(...response.mediaItems);
  } while (response.nextPageToken); // repeat until we have all the photos (until there is no "nextPageToken")
  return list.map((item) => {
    return {
      mediaItemId: item.id,
      baseUrl: item.baseUrl,
      creationTime: item.mediaMetadata.creationTime,
      width: item.mediaMetadata.width,
      height: item.mediaMetadata.height,
    };
  });
};

@Resolver()
export class AlbumResolver {
  @Query(() => Boolean)
  async getAllPhotos() {
    const dataSource = await getDataSource();
    console.log(await dataSource.getRepository(Photo).find());
  }

  @Query(() => [GoogleAlbum])
  async getGoogleAlbums() {
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
    return formattedResult.albums.map((item: any) => {
      return {
        id: item.id,
        title: item.title,
        coverPhotoBaseUrl: item.coverPhotoBaseUrl,
      };
    });
  }

  @Query(() => [Album])
  async getAlbums() {
    const dataSource = await getDataSource();
    return dataSource.getRepository(Album).find();
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

  @Mutation(() => Boolean)
  async saveAlbum(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    const token = (await getGoogleAuth().getAccessToken()).token;
    const albumResponse = await fetch(
      `https://photoslibrary.googleapis.com/v1/albums/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }
    );
    const formattedResult = await albumResponse.json();
    console.log(formattedResult);
    const album = await dataSource
      .getRepository(Album)
      .create({
        title: formattedResult.title,
        albumId: formattedResult.id,
        coverPhotoBaseUrl: formattedResult.coverPhotoBaseUrl,
        coverPhotoMediaItemId: formattedResult.coverPhotoMediaItemId,
      })
      .save();
    const allPhotos = await getAllPhotosFromAlbum(formattedResult.id);
    const result = await dataSource.getRepository(Photo).insert(
      allPhotos.map((item) => {
        return {
          ...item,
          albumId: album.id,
        };
      })
    );
    console.log(result);

    return true;
  }
}
