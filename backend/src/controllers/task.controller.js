const fillTaskSheet = async (request, reply) => {
  const internId = request.user.id
  const { taskId, imageUrl } = request.body

  // Note: Only INTERN roles are allowed to access this endpoint via middleware
  const proof = await request.server.prisma.proof.create({
    data: {
      taskId,
      internId,
      imageUrl
    }
  })

  return { success: true, proof }
}

module.exports = { fillTaskSheet }
