import type { FastifyInstance } from "fastify";
import { pegarSalas } from "./get.js";

export default async function (app: FastifyInstance) {
  await pegarSalas(app);
}
