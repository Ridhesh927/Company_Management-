const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clean DB
  await prisma.proof.deleteMany()
  await prisma.task.deleteMany()
  await prisma.rating.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.user.deleteMany()

  // Create Admin
  const admin = await prisma.user.create({
    data: { name: 'Admin User', email: 'admin@gmail.com', role: 'ADMIN', department: 'Global' }
  })

  // Create Senior TL
  const seniorTl = await prisma.user.create({
    data: { name: 'Senior TL User', email: 'seniortl@gmail.com', role: 'SENIOR_TL', department: 'MERN Stack', managerId: admin.id }
  })

  // Create TL
  const tl = await prisma.user.create({
    data: { name: 'Team Lead User', email: 'tl@gmail.com', role: 'TL', department: 'MERN Stack', managerId: seniorTl.id }
  })

  // Create Captain
  const captain = await prisma.user.create({
    data: { name: 'Captain User', email: 'captain@gmail.com', role: 'CAPTAIN', department: 'MERN Stack', managerId: tl.id }
  })

  // Create Interns
  const intern1 = await prisma.user.create({
    data: { name: 'Intern User', email: 'intern@gmail.com', role: 'INTERN', department: 'MERN Stack', managerId: captain.id }
  })
  
  const intern2 = await prisma.user.create({
    data: { name: 'Intern User 2', email: 'intern2@gmail.com', role: 'INTERN', department: 'MERN Stack', managerId: captain.id }
  })

  // Create Tasks
  const task1 = await prisma.task.create({
    data: { title: 'LinkedIn Repost Campaign', description: 'Repost the latest post on LinkedIn', targetAudience: 'All', deadline: new Date('2026-06-25T17:00:00Z') }
  })

  const task2 = await prisma.task.create({
    data: { title: 'Write Weekly Update', description: 'Submit your weekly progress report.', targetAudience: 'MERN Stack', deadline: new Date('2026-06-20T17:00:00Z') }
  })

  // Create Proofs
  await prisma.proof.create({
    data: { taskId: task1.id, internId: intern1.id, status: 'Approved' }
  })

  await prisma.proof.create({
    data: { taskId: task2.id, internId: intern2.id, status: 'Pending' }
  })

  // Create Attendance
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  await prisma.attendance.createMany({
    data: [
      { userId: intern1.id, date: yesterday, status: 'Present', markedBy: captain.id },
      { userId: intern2.id, date: yesterday, status: 'Present', markedBy: captain.id },
      { userId: intern1.id, date: today, status: 'Present', markedBy: captain.id }
    ]
  })

  // Create Ratings
  await prisma.rating.createMany({
    data: [
      { userId: intern1.id, raterId: captain.id, rating: 4.8, comments: 'Excellent performance this month.', month: 'May 2026' },
      { userId: intern2.id, raterId: captain.id, rating: 4.2, comments: 'Good work, but can improve speed.', month: 'May 2026' }
    ]
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
