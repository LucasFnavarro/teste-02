import type { FastifyInstance } from "fastify";
import { pegarHorasProfessor } from "./get.js";

export default async function (app: FastifyInstance) {
  await pegarHorasProfessor(app);
}
