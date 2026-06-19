const userController = require('../controllers/user.controller')

async function userRoutes(fastify, options) {
  fastify.get('/:id/dashboard', userController.getDashboardData)
}

module.exports = userRoutes
