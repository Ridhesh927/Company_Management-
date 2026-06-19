const login = async (request, reply) => {
  const { role } = request.body
  const user = await request.server.prisma.user.findFirst({
    where: { role: role }
  })
  
  if (!user) return reply.code(404).send({ error: 'User not found' })
  
  return { success: true, user }
}

module.exports = { login }
