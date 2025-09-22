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

    // Calcular quantidade de horas que cada professor tem em aulas ministrada.
    const horasPorProfessor = result.map((professor) => {
      let horasTotais = 0;

      const details: any[] = [];

      professor.subjects.forEach((subject) => {
        subject.classes.forEach((cls) => {
          cls.schedule.forEach((sch) => {
            const start = new Date(`2025-01-01T${sch.startTime}`);
            const end = new Date(`2025-01-01T${sch.endTime}`);
            const horas = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

            const horaTotal = (horasTotais += horas).toFixed(2);

            details.push({
              subject: subject.name,
              classId: cls.id,
              dayOfWeek: sch.dayOfWeek,
              startTime: sch.startTime,
              endTime: sch.endTime,
              hours: horaTotal + " horas de aula ministrada.",
            });
          });
        });
      });

      return {
        professorId: professor.id,
        professorName: professor.name,
        totalHours: horasTotais.toFixed(2),
        details,
      };
    });

    return {
      message: "Horas totais por professor",
      data: horasPorProfessor,
    };
  });
};
