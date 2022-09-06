import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Photo } from "./Photo";

@Entity()
@ObjectType()
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  title!: string;

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
