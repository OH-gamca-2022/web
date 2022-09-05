import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Photo } from "./Photo";

@Entity()
@ObjectType()
export class Album {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  albumId!: string;

  @Column()
  @Field()
  coverPhotoBaseUrl!: string;

  @Column()
  @Field()
  coverPhotoMediaItemId!: string;

  @OneToMany(() => Photo, (photo) => photo.album)
  @Field(() => [Photo])
  photos!: Relation<Photo>[];
}
