const ratingController = require('../controllers/rating.controller')

async function ratingRoutes(fastify, options) {
  fastify.get(
    '/',
    { preValidation: [fastify.authenticate] },
    ratingController.getRatings
  )
}

module.exports = ratingRoutes
