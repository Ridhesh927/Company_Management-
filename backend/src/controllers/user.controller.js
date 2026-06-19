const getDashboardData = async (request, reply) => {
  const { id } = request.params
  const userId = parseInt(id)
  
  const user = await request.server.prisma.user.findUnique({
    where: { id: userId },
    include: {
      subordinates: true,
      attendances: true,
      proofs: true,
      ratingsGot: true
    }
  })
  
  if (!user) return reply.code(404).send({ error: 'User not found' })

  // If Manager
  let pendingProofs = []
  if (['ADMIN', 'SENIOR_TL', 'TL', 'CAPTAIN'].includes(user.role)) {
    const subIds = user.subordinates.map(s => s.id)
    pendingProofs = await request.server.prisma.proof.findMany({
      where: { internId: { in: subIds }, status: 'Pending' },
      include: { task: true, intern: true }
    })
  }

  // Active Tasks
  const activeTasks = await request.server.prisma.task.findMany({
    where: { status: 'Active' }
  })

  return { 
    success: true, 
    user,
    pendingProofs,
    activeTasks
  }
}

module.exports = { getDashboardData }
