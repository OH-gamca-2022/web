import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  class?: string;

  @Column()
  @Field()
  name!: string;
}
