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

  "saved" BOOLEAN NOT NULL,
  "created_at" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "user_likes" (
  "id" serial NOT NULL,
  "likes_user" INT NOT NULL,
  "liked_by" INT NOT NULL,
  "created_at" timestamptz NOT NULL default now(),
	CONSTRAINT "user_likes_pk" PRIMARY KEY ("id"),
  CONSTRAINT "user_likes_fk1" FOREIGN KEY ("likes_user") REFERENCES "users"("user_id"),
  CONSTRAINT "user_likes_fk2" FOREIGN KEY ("liked_by") REFERENCES "users"("user_id")
);
