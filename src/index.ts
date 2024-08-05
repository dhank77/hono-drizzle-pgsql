import { Hono } from "hono";
import contact from "./contact";
import auth from "./auth";
import { jwt } from 'hono/jwt'


const app = new Hono().basePath("/api");

app.get("/", (c) => {
   return c.text("Hello Hono!");
});

app.use(
  '/contact/*',
  jwt({
    secret: process.env.SECRET_KEY!,
  })
)

app
  .route("/contact", contact)
  .route("/auth", auth);

export default app;
