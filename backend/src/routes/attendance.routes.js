const attendanceController = require('../controllers/attendance.controller')

async function attendanceRoutes(fastify, options) {
  fastify.get(
    '/',
    { preValidation: [fastify.authenticate] },
    attendanceController.getAttendances
  )
}

module.exports = attendanceRoutes
