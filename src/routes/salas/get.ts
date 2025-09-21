import type { FastifyInstance } from "fastify";
import { prisma } from "../../prisma/prismaClient.js";

export async function pegarSalas(app: FastifyInstance) {
  app.get("/horarios", async () => {
    const salas = await prisma.room.findMany({
      include: { schedules: true },
    });

    const horarios = salas.map((room) => {
      const ocupados = room.schedules.map((sch) => ({
        day: sch.dayOfWeek,
        startTime: sch.startTime,
        endTime: sch.endTime,
      }));

      return {
        roomId: room.id,
        roomName: room.name,
        ocupados,
      };
    });

    return horarios;
  });
}
