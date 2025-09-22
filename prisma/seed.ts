import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  await prisma.classSchedule.deleteMany();
  await prisma.class.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.professor.deleteMany();
  await prisma.room.deleteMany();
  await prisma.title.deleteMany();
  await prisma.department.deleteMany();

  // Criar Departamentos
  const departments = await prisma.department.createMany({
    data: [
      { name: 'Ciência da Computação' },
      { name: 'Matemática' },
      { name: 'Física' },
      { name: 'Química' },
      { name: 'Biologia' },
    ],
  });

  const createdDepartments = await prisma.department.findMany();

  // Criar Títulos
  const titles = await prisma.title.createMany({
    data: [
      { name: 'Doutor' },
      { name: 'Mestre' },
      { name: 'Especialista' },
      { name: 'Graduado' },
    ],
  });

  const createdTitles = await prisma.title.findMany();

  // Criar Professores
  const professorsData = [
    {
      name: 'Dr. Chavito',
      departmentId: createdDepartments[0]?.id ?? null,
      titleId: createdTitles[0]?.id ?? null,
    },
    {
      name: 'Prof. Girafa',
      departmentId: createdDepartments[1]?.id ?? null,
      titleId: createdTitles[1]?.id ?? null,
    },
    {
      name: 'Senhor Barriga',
      departmentId: createdDepartments[2]?.id ?? null,
      titleId: createdTitles[0]?.id ?? null,
    },
    {
      name: 'Prof. Godínez',
      departmentId: createdDepartments[3]?.id ?? null,
      titleId: createdTitles[2]?.id ?? null,
    },
    {
      name: 'Seu Madruga',
      departmentId: createdDepartments[4]?.id ?? null,
      titleId: createdTitles[0]?.id ?? null,
    },
  ];

  const professors = await prisma.professor.createMany({
    data: professorsData,
  });

  const createdProfessors = await prisma.professor.findMany();

  // Criar Matérias
  const subjects = await prisma.subject.createMany({
    data: [
      {
        code: 'CC101',
        name: 'Algoritmos e Estruturas de Dados',
        professorId: createdProfessors[0]?.id ?? null,
      },
      {
        code: 'MAT201',
        name: 'Cálculo Diferencial e Integral',
        professorId: createdProfessors[1]?.id ?? null,
      },
      {
        code: 'FIS301',
        name: 'Física Geral',
        professorId: createdProfessors[2]?.id ?? null,
      },
      {
        code: 'QUI401',
        name: 'Química Orgânica',
        professorId: createdProfessors[3]?.id ?? null,
      },
      {
        code: 'BIO501',
        name: 'Biologia Molecular',
        professorId: createdProfessors[4]?.id ?? null,
      },
      {
        code: 'CC102',
        name: 'Programação Orientada a Objetos',
        professorId: createdProfessors[0]?.id ?? null,
      },
    ],
  });

  const createdSubjects = await prisma.subject.findMany();

  // Criar Salas
  const rooms = await prisma.room.createMany({
    data: [
      { name: 'Sala 101', disponivel: true },
      { name: 'Sala 102', disponivel: true },
      { name: 'Sala 201', disponivel: true },
      { name: 'Sala 202', disponivel: false },
      { name: 'Laboratório de Informática', disponivel: true },
      { name: 'Auditório Principal', disponivel: true },
    ],
  });

  const createdRooms = await prisma.room.findMany();

  // Criar Turmas
  const classes = await prisma.class.createMany({
    data: [
      {
        subjectId: createdSubjects[0]!.id,
        year: 2024,
        semester: 1,
        code: 'CC101-2024-1',
      },
      {
        subjectId: createdSubjects[1]!.id,
        year: 2024,
        semester: 1,
        code: 'MAT201-2024-1',
      },
      {
        subjectId: createdSubjects[2]!.id,
        year: 2024,
        semester: 1,
        code: 'FIS301-2024-1',
      },
      {
        subjectId: createdSubjects[3]!.id,
        year: 2024,
        semester: 2,
        code: 'QUI401-2024-2',
      },
      {
        subjectId: createdSubjects[4]!.id,
        year: 2024,
        semester: 2,
        code: 'BIO501-2024-2',
      },
      {
        subjectId: createdSubjects[5]!.id,
        year: 2024,
        semester: 2,
        code: 'CC102-2024-2',
      },
    ],
  });

  const createdClasses = await prisma.class.findMany();

  // Criar Horários das Turmas
  await prisma.classSchedule.createMany({
    data: [
      {
        classId: createdClasses[0]!.id,
        roomId: createdRooms[4]!.id, // Lab de Informática
        dayOfWeek: 'Segunda-feira',
        startTime: '08:00',
        endTime: '10:00',
      },
      {
        classId: createdClasses[0]!.id,
        roomId: createdRooms[4]!.id,
        dayOfWeek: 'Quarta-feira',
        startTime: '08:00',
        endTime: '10:00',
      },
      {
        classId: createdClasses[1]!.id,
        roomId: createdRooms[0]!.id,
        dayOfWeek: 'Terça-feira',
        startTime: '10:00',
        endTime: '12:00',
      },
      {
        classId: createdClasses[1]!.id,
        roomId: createdRooms[0]!.id,
        dayOfWeek: 'Quinta-feira',
        startTime: '10:00',
        endTime: '12:00',
      },
      {
        classId: createdClasses[2]!.id,
        roomId: createdRooms[1]!.id,
        dayOfWeek: 'Segunda-feira',
        startTime: '14:00',
        endTime: '16:00',
      },
      {
        classId: createdClasses[3]!.id,
        roomId: createdRooms[2]!.id,
        dayOfWeek: 'Sexta-feira',
        startTime: '16:00',
        endTime: '18:00',
      },
      {
        classId: createdClasses[4]!.id,
        roomId: createdRooms[1]!.id,
        dayOfWeek: 'Terça-feira',
        startTime: '14:00',
        endTime: '16:00',
      },
      {
        classId: createdClasses[5]!.id,
        roomId: createdRooms[4]!.id,
        dayOfWeek: 'Quarta-feira',
        startTime: '16:00',
        endTime: '18:00',
      },
    ],
  });

  console.log('✅ Seeding concluído com sucesso!');
  console.log(`📊 Dados criados:`);
  console.log(`   - ${createdDepartments.length} departamentos`);
  console.log(`   - ${createdTitles.length} títulos`);
  console.log(`   - ${createdProfessors.length} professores`);
  console.log(`   - ${createdSubjects.length} matérias`);
  console.log(`   - ${createdRooms.length} salas`);
  console.log(`   - ${createdClasses.length} turmas`);
  console.log(`   - 8 horários de aula`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });