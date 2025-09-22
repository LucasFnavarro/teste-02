import { app } from "./app.js";

await app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then(() => {
    console.log(`🚀 Server is running on port 3333`);
  });
