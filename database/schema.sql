set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "users" (
	"user_id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"instrument" TEXT NOT NULL,
	"country" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"about" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"hashed_password" TEXT NOT NULL,
	"photo_url" TEXT NOT NULL,
	"likes" INT NOT NULL,
  "saved" BOOLEAN NOT NULL,
  "created_at" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);

-- CREATE TABLE "comments" (
-- 	"comment_id" serial NOT NULL,
-- 	"comments" TEXT NOT NULL,
-- 	"user_id" integer NOT NULL,
-- 	CONSTRAINT "comments_pk" PRIMARY KEY ("comment_id")
-- ) WITH (
--   OIDS=FALSE
-- );

-- ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
