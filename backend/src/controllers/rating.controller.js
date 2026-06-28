const getRatings = async (request, reply) => {
  const userRole = request.user.role
  const userId = request.user.id

  let whereClause = {}
  
  if (userRole === 'INTERN') {
    whereClause = { userId: userId }
  } else {
    const subordinates = await request.server.prisma.user.findMany({
      where: { managerId: userId },
      select: { id: true }
    })
    const subIds = subordinates.map(s => s.id)
    whereClause = { userId: { in: [userId, ...subIds] } }
  }

  const ratings = await request.server.prisma.rating.findMany({
    where: whereClause
  })

  return { success: true, ratings }
}

module.exports = { getRatings }
