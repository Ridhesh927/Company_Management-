const authController = require('../controllers/auth.controller')

async function authRoutes(fastify, options) {
  fastify.post('/login', authController.login)
}

module.exports = authRoutes
