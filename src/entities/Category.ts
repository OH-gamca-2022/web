import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Discipline } from "./Discipline";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @ManyToOne(() => Discipline, (disc) => disc.category, { nullable: true })
  @Field(() => [Discipline], { nullable: true })
  disciplines?: Discipline[];
}
