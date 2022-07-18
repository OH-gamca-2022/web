import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Category } from "./Category";
import { Discipline } from "./Discipline";
import { Post } from "./Post";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @ManyToMany(() => Post, (post) => post.tags, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @Field(() => [Post], { nullable: true })
  posts?: Relation<Post>[];

  @Field(() => Discipline, { nullable: true })
  @OneToOne(() => Discipline, (disc) => disc.tag, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  discipline?: Relation<Discipline>;

  @Field(() => String)
  @Column(() => String)
  disciplineId?: string;

  @Field(() => Category, { nullable: true })
  @OneToOne(() => Category, (cat) => cat.tag, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  category?: Relation<Category>;

  @Field(() => String)
  @Column(() => String)
  categoryId?: string;
}
