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
  UpdateDateColumn,
} from "typeorm";
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
  tags?: Tag[];

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
