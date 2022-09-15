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

@ObjectType()
export class Photo {
  @Field()
  id!: string;

  @Field()
  baseUrl!: string;

  @Field()
  height!: number;

  @Field()
  width!: number;

  @Field()
  creationTime!: string;
}

@ObjectType()
export class PhotoResponse {
  @Field(() => [Photo])
  photos!: Photo[];

  @Field({ nullable: true })
  nextPageToken?: string;
}

const getAllPhotosFromAlbum = async (
  albumId: string,
  nextPageToken?: string
) => {
  const token = (await getGoogleAuth().getAccessToken()).token;
  var response: any = {};
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
        nextPageToken
          ? { albumId, pageSize: 10, pageToken: nextPageToken }
          : { albumId, pageSize: 10 }
      ),
    })
  ).json();
  const photos = response.mediaItems.map((item: any) => {
    return {
      id: item.id,
      baseUrl: item.baseUrl,
      creationTime: item.mediaMetadata.creationTime,
      width: item.mediaMetadata.width,
      height: item.mediaMetadata.height,
    };
  });
  return [photos, response.nextPageToken];
};

const refreshAllAlbums = async () => {
  const dataSource = await getDataSource();
  const albums = await dataSource.getRepository(Album).find();
  const token = (await getGoogleAuth().getAccessToken()).token;
  const result = await fetch("https://photoslibrary.googleapis.com/v1/albums", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  const formattedResult = await result.json();
  const editedAlbums = albums.map((album, index) => {
    const newUrl = formattedResult.albums.find(
      (item: any) => item.id == album.albumId
    ).coverPhotoBaseUrl;
    if (newUrl) {
      return {
        ...album,
        coverPhotoBaseUrl: newUrl,
      };
    } else {
      return album;
    }
  });
  await dataSource.getRepository(Album).save(editedAlbums);
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
    console.log(formattedResult);
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
    await refreshAllAlbums();
    const albums = await dataSource.getRepository(Album).find();
    console.log(albums);
    return albums;
  }

  @Query(() => PhotoResponse)
  async getPhotosFromAlbum(
    @Arg("albumId") albumId: string,
    @Arg("nextPageToken", { nullable: true }) nextPageToken?: string
  ): Promise<PhotoResponse> {
    const dataSource = await getDataSource();
    const album = await dataSource
      .getRepository(Album)
      .findOne({ where: { id: albumId } });

    if (album) {
      const [photos, token] = await getAllPhotosFromAlbum(
        album?.albumId,
        nextPageToken
      );
      console.log(photos, token);
      return {
        photos,
        nextPageToken: token,
      };
    } else {
      return {
        photos: [],
      };
    }
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
