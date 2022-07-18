import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Discipline } from "./Discipline";
import { Tag } from "./Tag";

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

  @Field(() => Tag)
  @OneToOne(() => Tag, (tag) => tag.category)
  tag!: Relation<Tag>;
}
