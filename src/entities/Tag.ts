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
import { CalendarEvent } from "./CalendarEvent";
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

  @ManyToMany(() => CalendarEvent, (event) => event.tags, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @Field(() => [CalendarEvent], { nullable: true })
  events?: Relation<CalendarEvent>[];

  @Field(() => Discipline, { nullable: true })
  @OneToOne(() => Discipline, (disc) => disc.tag, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  discipline?: Relation<Discipline>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  disciplineId?: string;

  @Field(() => Category, { nullable: true })
  @OneToOne(() => Category, (cat) => cat.tag, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  category?: Relation<Category>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  categoryId?: string;
}
