import { type } from "os";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ROLES {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
}

export const ROLE_LEVELS = {
  ADMIN: 2,
  EDITOR: 1,
  USER: 0,
};

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

  @Column({
    enum: ROLES,
    default: ROLES.USER,
  })
  @Field(() => String)
  role!: ROLES;
}
