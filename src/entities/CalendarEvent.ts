import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Tag } from "./Tag";

@Entity()
@ObjectType()
export class CalendarEvent {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  startDate!: Date;

  @Field()
  @Column()
  endDate!: Date;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.events, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinTable()
  tags?: Relation<Tag>[];

  @Field()
  @Column()
  googleId?: string;

  @Field()
  @Column()
  allDay!: boolean;
}
