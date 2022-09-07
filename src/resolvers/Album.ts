import { google } from "googleapis";
import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Mutation,
  Arg,
  Int,
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

@ObjectType()
export class BothAlbums {
  @Field(() => Album, { nullable: true })
  savedAlbum!: Album | null;

  @Field(() => GoogleAlbum)
  googleAlbum!: GoogleAlbum;
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

  @Query(() => [BothAlbums])
  async getGoogleAlbums() {
    const dataSource = await getDataSource();
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
    const savedAlbums = await dataSource.getRepository(Album).find();
    const googleAlbums = formattedResult.albums.map((item: any) => {
      return {
        id: item.id,
        title: item.title,
        coverPhotoBaseUrl: item.coverPhotoBaseUrl,
      };
    });
    return googleAlbums.map((item: any) => {
      const existingAlbum = savedAlbums.find(
        (savedAlbum) => savedAlbum.albumId == item.id
      );
      return {
        googleAlbum: item,
        savedAlbum: existingAlbum ? existingAlbum : null,
      };
    });
  }

  @Query(() => [Album])
  async getAlbums() {
    const dataSource = await getDataSource();
    return dataSource.getRepository(Album).find();
  }

  @Query(() => [Photo])
  async getPhotosFromAlbum(
    @Arg("albumId") albumId: string,
    @Arg("offset") offset: number,
    @Arg("limit") limit: number
  ) {
    const dataSource = await getDataSource();
    const photos = await dataSource
      .getRepository(Photo)
      .createQueryBuilder()
      .select()
      .where({ albumId: albumId })
      .skip(offset)
      .take(limit)
      .getMany();
    return photos;
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

  @Mutation(() => Boolean)
  async deleteAlbum(@Arg("id") id: string) {
    const dataSource = await getDataSource();
    const album = await dataSource
      .getRepository(Album)
      .findOne({ where: { id: id } });
    if (album) {
      await dataSource.getRepository(Album).remove(album);
      return true;
    } else {
      return false;
    }
  }
}
