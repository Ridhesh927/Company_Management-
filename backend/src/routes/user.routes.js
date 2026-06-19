const userController = require('../controllers/user.controller')

async function userRoutes(fastify, options) {
  fastify.get('/:id/dashboard', { preValidation: [fastify.authenticate] }, userController.getDashboardData)
}

module.exports = userRoutes
