import { zValidator } from "@hono/zod-validator";
import { sign } from "hono/jwt";
import { Hono } from "hono";
import { z } from "zod";
import db from "./libs/db";
import { users } from "./libs/schema";
import { and, eq } from "drizzle-orm";

const auth = new Hono()
   .post(
      "/register",
      zValidator(
         "json",
         z.object({
            name: z.string().min(1),
            username: z.string().min(1),
            password: z.string().min(1),
         })
      ),
      async (c) => {
         const json = c.req.valid("json");

         const [data] = await db.insert(users).values(json).returning();

         return c.json({ data });
      }
   )
   .post(
      "/login",
      zValidator(
         "json",
         z.object({
            username: z.string().min(1),
            password: z.string().min(1),
         })
      ),
      async (c) => {
         const { username, password } = c.req.valid("json");

         const data = await db
            .select()
            .from(users)
            .where(
               and(eq(users.username, username), eq(users.password, password))
            );

         if (data.length === 0) {
            return c.json(
               { status: false, message: "Invalid username or password" },
               400
            );
         }

         const user = data[0];
         const payload = {
            id: user.id,
            username: username,
            role: "admin",
            exp: Math.floor(Date.now() / 1000) + 60 * 5,
         };
         const secret = process.env.SECRET_KEY!;
         const token = await sign(payload, secret);

         return c.json({ status: true, token: token, payload: payload });
      }
   );

export default auth;
