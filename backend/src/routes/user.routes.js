const userController = require('../controllers/user.controller')
const { requireRole, requireHierarchy } = require('../plugins/auth.middleware')

async function userRoutes(fastify, options) {
  fastify.get('/:id/dashboard', { preValidation: [fastify.authenticate] }, userController.getDashboardData)

  fastify.post(
    '/interns',
    { preValidation: [requireRole(['ADMIN', 'SENIOR_TL', 'TL', 'CAPTAIN'])] },
    userController.createIntern
  )

  fastify.put(
    '/:id/promote',
    { preValidation: [requireHierarchy] },
    userController.promoteUser
  )
}

module.exports = userRoutes
