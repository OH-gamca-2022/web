import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Album } from "./Album";

@Entity()
@ObjectType()
export class Photo {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Field()
  @Column()
  mediaItemId!: string;

  @Field()
  @Column()
  baseUrl!: string;

  @Field()
  @Column()
  creationTime!: string;

  @ManyToOne(() => Album, (album) => album.photos, { onDelete: "CASCADE" })
  @Field(() => Album)
  album!: Relation<Album>;

  @Field()
  @Column()
  albumId!: string;

  @Field()
  @Column()
  width!: number;

  @Field()
  @Column()
  height!: number;
}
