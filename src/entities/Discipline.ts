import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { Category } from "./Category";
import { Post } from "./Post";
import { Tag } from "./Tag";

@Entity()
@ObjectType()
export class Discipline extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @ManyToOne(() => Category, (cat) => cat.disciplines, { onDelete: "CASCADE" })
  @Field(() => Category)
  category!: Relation<Category>;

  @Field()
  @Column()
  categoryId!: string;

  @Field(() => Tag)
  @OneToOne(() => Tag, (tag) => tag.discipline)
  tag!: Relation<Tag>;
}
