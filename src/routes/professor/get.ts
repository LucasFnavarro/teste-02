import type { FastifyInstance } from "fastify";
import { prisma } from "../../prisma/prismaClient.js";

export const pegarHorasProfessor = async (app: FastifyInstance) => {
  app.get("/horas", async () => {
    const result = await prisma.professor.findMany({
      include: {
        subjects: {
          include: {
            classes: {
              include: {
                schedule: true,
              },
            },
          },
        },
      },
    });

    // Calcular quantidade de horas que cada professor tem comprometido em aulas
    const horasPorProfesssor = result.map((professor) => {
      let horasTotais = 0;
      professor.subjects.forEach((subject) => {
        subject.classes.forEach((cls) => {
          cls.schedule.forEach((sch) => {
            const start = new Date(`2025-01-01T${sch.startTime}`);
            const end = new Date(`2025-01-01T${sch.endTime}`);
            horasTotais += (end.getTime() - start.getTime()) / (1000 * 60 * 60);
          });
        });
      });

      return {
        professorId: professor.id,
        professorName: professor.name,
        totalHours: horasTotais,
      };
    });

    return {
      message: "Horas totais por professor",
      data: horasPorProfesssor,
    };
  });
};
