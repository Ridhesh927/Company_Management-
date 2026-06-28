const getAttendances = async (request, reply) => {
  const userRole = request.user.role
  const userId = request.user.id

  let whereClause = {}
  
  if (userRole === 'INTERN') {
    whereClause = { userId: userId }
  } else {
    // If not intern, you might want to fetch all or based on query params
    // Let's say managers can see attendances of their subordinates
    const subordinates = await request.server.prisma.user.findMany({
      where: { managerId: userId },
      select: { id: true }
    })
    const subIds = subordinates.map(s => s.id)
    whereClause = { userId: { in: [userId, ...subIds] } }
  }

  const attendances = await request.server.prisma.attendance.findMany({
    where: whereClause
  })

  return { success: true, attendances }
}

module.exports = { getAttendances }
