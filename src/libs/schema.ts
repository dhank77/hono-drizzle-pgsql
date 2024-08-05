import { serial, text, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
   id: serial("id").primaryKey(),
   name: text("name"),
   username: text("username").unique(),
   password: text("password"),
});
