const { createLeaveRequest, getLeaveRequests, approveLeaveRequest, rejectLeaveRequest } = require('../controllers/leave.controller');
const { requireAuth, requireRole } = require('../plugins/auth.middleware');

async function leaveRoutes(fastify, options) {
  // Submit a leave request
  fastify.post('/', { preHandler: [requireAuth] }, createLeaveRequest);

  // Fetch leave requests
  fastify.get('/', { preHandler: [requireAuth] }, getLeaveRequests);

  // Approve a leave request
  fastify.put('/:id/approve', { preHandler: [requireAuth, requireRole(['TL', 'SENIOR_TL', 'CAPTAIN', 'ADMIN'])] }, approveLeaveRequest);

  // Reject a leave request
  fastify.put('/:id/reject', { preHandler: [requireAuth, requireRole(['TL', 'SENIOR_TL', 'CAPTAIN', 'ADMIN'])] }, rejectLeaveRequest);
}

module.exports = leaveRoutes;
