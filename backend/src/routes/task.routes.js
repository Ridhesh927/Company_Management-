const taskController = require('../controllers/task.controller')
const { requireRole } = require('../plugins/auth.middleware')

async function taskRoutes(fastify, options) {
  fastify.post(
    '/proofs',
    { preValidation: [fastify.authenticate, requireRole(['INTERN'])] },
    taskController.fillTaskSheet
  )
}

module.exports = taskRoutes
