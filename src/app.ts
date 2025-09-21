import fastify from "fastify";
import autoload from "@fastify/autoload";
import path from "path";
import { fileURLToPath } from "url";

export const app = fastify();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.register(autoload, {
  dir: path.join(__dirname, "routes"),
});
