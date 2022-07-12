import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { Discipline } from "./Discipline";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subtitle?: string;

  @Field()
  @Column()
  text!: string;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.posts, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinTable()
  tags?: Relation<Tag>[];

  @Field(() => Discipline, { nullable: true })
  @ManyToOne(() => Discipline, (disc) => disc.posts, { nullable: true })
  discipline?: Relation<Discipline>;

  @Column({ default: false })
  @Field()
  published!: Boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  publishDate?: Date;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;
}
