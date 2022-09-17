import { MigrationInterface, QueryRunner } from "typeorm";

export class NewDatabase1663439242960 implements MigrationInterface {
  name = "NewDatabase1663439242960";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "albumId" character varying NOT NULL, "coverPhotoBaseUrl" character varying NOT NULL, "coverPhotoMediaItemId" character varying NOT NULL, CONSTRAINT "UQ_a2994cf97f71adf2de773f64a18" UNIQUE ("albumId"), CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "discipline" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_139512aefbb11a5b2fa92696828" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "googleCalendarId" text, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "subtitle" character varying, "text" character varying NOT NULL, "published" boolean NOT NULL DEFAULT false, "publishDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "disciplineId" uuid, "categoryId" uuid, CONSTRAINT "REL_12539a709fc462799954f13ca8" UNIQUE ("disciplineId"), CONSTRAINT "REL_60fbdce32f9ca3b5afce15a9c3" UNIQUE ("categoryId"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "calendar_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "googleId" character varying NOT NULL, "allDay" boolean NOT NULL, "class" character varying, CONSTRAINT "PK_176fe24e6eb48c3fef696c7641f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "class" character varying, "name" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "post_tags_tag" ("postId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_e9b7b8e6a07bdccb6a954171676" PRIMARY KEY ("postId", "tagId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b651178cc41334544a7a9601c4" ON "post_tags_tag" ("postId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41e7626b9cc03c5c65812ae55e" ON "post_tags_tag" ("tagId") `
    );
    await queryRunner.query(
      `CREATE TABLE "calendar_event_tags_tag" ("calendarEventId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_dd9a758bb056f7a33825dcb7f1a" PRIMARY KEY ("calendarEventId", "tagId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_60f44818ba4985a4ab64fe371c" ON "calendar_event_tags_tag" ("calendarEventId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_25df335516ea2f4fe5ab555bb4" ON "calendar_event_tags_tag" ("tagId") `
    );
    await queryRunner.query(
      `ALTER TABLE "discipline" ADD CONSTRAINT "FK_463a9e10e833909fa1186512478" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_12539a709fc462799954f13ca8e" FOREIGN KEY ("disciplineId") REFERENCES "discipline"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "FK_60fbdce32f9ca3b5afce15a9c32" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "post_tags_tag" ADD CONSTRAINT "FK_b651178cc41334544a7a9601c45" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "post_tags_tag" ADD CONSTRAINT "FK_41e7626b9cc03c5c65812ae55e8" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "calendar_event_tags_tag" ADD CONSTRAINT "FK_60f44818ba4985a4ab64fe371c1" FOREIGN KEY ("calendarEventId") REFERENCES "calendar_event"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "calendar_event_tags_tag" ADD CONSTRAINT "FK_25df335516ea2f4fe5ab555bb48" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "calendar_event_tags_tag" DROP CONSTRAINT "FK_25df335516ea2f4fe5ab555bb48"`
    );
    await queryRunner.query(
      `ALTER TABLE "calendar_event_tags_tag" DROP CONSTRAINT "FK_60f44818ba4985a4ab64fe371c1"`
    );
    await queryRunner.query(
      `ALTER TABLE "post_tags_tag" DROP CONSTRAINT "FK_41e7626b9cc03c5c65812ae55e8"`
    );
    await queryRunner.query(
      `ALTER TABLE "post_tags_tag" DROP CONSTRAINT "FK_b651178cc41334544a7a9601c45"`
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "FK_60fbdce32f9ca3b5afce15a9c32"`
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "FK_12539a709fc462799954f13ca8e"`
    );
    await queryRunner.query(
      `ALTER TABLE "discipline" DROP CONSTRAINT "FK_463a9e10e833909fa1186512478"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_25df335516ea2f4fe5ab555bb4"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_60f44818ba4985a4ab64fe371c"`
    );
    await queryRunner.query(`DROP TABLE "calendar_event_tags_tag"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_41e7626b9cc03c5c65812ae55e"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b651178cc41334544a7a9601c4"`
    );
    await queryRunner.query(`DROP TABLE "post_tags_tag"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "calendar_event"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "discipline"`);
    await queryRunner.query(`DROP TABLE "album"`);
  }
}
