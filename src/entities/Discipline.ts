import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Category } from "./Category";
import { Post } from "./Post";

@Entity()
@ObjectType()
export class Discipline extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @ManyToOne(() => Category, (cat) => cat.disciplines)
  @Field(() => Category)
  category!: Relation<Category>;

  @Field()
  @Column()
  categoryId!: string;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.discipline, { nullable: true })
  posts?: Relation<Post>[];
}
