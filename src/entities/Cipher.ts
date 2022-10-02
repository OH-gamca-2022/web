import { FILE } from "dns";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Answer } from "./Answer";

@Entity()
@ObjectType()
export class Cipher extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fileLink?: string;

  @Column()
  @Field()
  correctAnswer!: string;

  @Column({ default: false })
  @Field()
  published!: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  publishDate?: Date;

  @OneToMany(() => Answer, (answer) => answer.cipher)
  @Field(() => Answer)
  answers!: Relation<Answer>[];
}
