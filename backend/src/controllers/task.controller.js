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

const approveProof = async (request, reply) => {
  const { id } = request.params
  const proofId = parseInt(id)
  
  // Update proof status and award points (e.g. 10 points per task)
  const proof = await request.server.prisma.proof.update({
    where: { id: proofId },
    data: { status: 'Approved' }
  })
  
  // Award points to the intern
  await request.server.prisma.user.update({
    where: { id: proof.internId },
    data: { points: { increment: 10 } }
  })
  
  return { success: true, proof }
}

module.exports = { fillTaskSheet, approveProof }
