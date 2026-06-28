const { getUserAnalytics, getTeamAnalytics } = require('../controllers/analytics.controller');
const { requireAuth, requireRole } = require('../plugins/auth.middleware');

async function analyticsRoutes(fastify, options) {
  // Fetch personal or subordinate analytics
  fastify.get('/user/:id', { preHandler: [requireAuth] }, getUserAnalytics);

  // Fetch team analytics
  fastify.get('/team', { preHandler: [requireAuth, requireRole(['TL', 'SENIOR_TL', 'CAPTAIN', 'ADMIN'])] }, getTeamAnalytics);
}

module.exports = analyticsRoutes;
