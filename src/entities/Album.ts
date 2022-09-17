import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Relation } from "typeorm";

@Entity()
@ObjectType()
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  title!: string;

  @Column({ unique: true })
  @Field()
  albumId!: string;

  @Column()
  @Field()
  coverPhotoBaseUrl!: string;

  @Column()
  @Field()
  coverPhotoMediaItemId!: string;
}
