const app = require('./src/app')

const start = async () => {
  try {
    await app.listen({ port: 3001, host: '0.0.0.0' })
    app.log.info(`Backend listening on http://localhost:3001`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
