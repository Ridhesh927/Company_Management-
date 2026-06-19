const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')
const prismaPlugin = require('./plugins/prisma')
const jwtPlugin = require('./plugins/jwt')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')

fastify.register(cors, { 
  origin: '*'
})

fastify.register(prismaPlugin)
fastify.register(jwtPlugin)

fastify.register(authRoutes, { prefix: '/api/v1/auth' })
fastify.register(userRoutes, { prefix: '/api/v1/users' })

module.exports = fastify
