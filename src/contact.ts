import { Hono } from "hono";

const contact = new Hono()
   .get("/", async (c) => {
      return c.json({
         data: {
            name: "Hamdani",
            email: "hamdanilatjoro@gmail.com",
         },
      });
   })
   .get("/:id", (c) => {
      const { id } = c.req.param();
      const page = c.req.query("page");
      return c.json({ contact_id: id, page: page });
   });

export default contact;
