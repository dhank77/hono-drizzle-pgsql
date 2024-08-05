CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"username" text,
	"password" text,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
