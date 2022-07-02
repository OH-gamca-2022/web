import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @ManyToMany(() => Post, (post) => post.tags, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}
