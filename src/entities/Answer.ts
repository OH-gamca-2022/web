import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Cipher } from "./Cipher";

@Entity()
@ObjectType()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  answer!: string;

  @Column()
  @Field()
  correct!: boolean;

  @Column()
  @Field()
  time!: Date;

  @Column()
  @Field()
  cipherId!: string;

  @ManyToOne(() => Cipher, (cipher) => cipher.answers)
  @Field(() => Cipher)
  cipher!: Relation<Cipher>;

  @Column()
  @Field()
  className!: string;
}
