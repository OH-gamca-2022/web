import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";

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
  @Field()
  category!: Category;

  @Field()
  @Column()
  categoryId!: string;
}
