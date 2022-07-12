import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
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

  @OneToMany(() => Discipline, (disc) => disc.category, { nullable: true })
  @Field(() => [Discipline], { nullable: true })
  disciplines?: Relation<Discipline>[];
}
