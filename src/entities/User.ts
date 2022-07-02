import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  class?: string;

  @Column()
  @Field()
  name!: string;

  // @Field(() => [Post], { nullable: true })
  // @OneToMany(() => Post, (post) => post.user, { nullable: true })
  // posts?: Post[];
}
