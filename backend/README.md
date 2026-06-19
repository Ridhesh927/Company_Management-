# UpToSkills Management System - Backend

This is the Fastify backend for the UpToSkills Intern Management System. It uses Prisma ORM to connect to a PostgreSQL database (Neon).

## Setup & Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Configure your environment variables:
   Create a `.env` file in the `backend` directory and add your Neon Database connection string:
   ```env
   DATABASE_URL="postgresql://neondb_owner:password@your-neon-host.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"
   ```

## Database Management & Seeding

To push the database schema and populate it with initial mock data (Admin, Captains, Interns, Tasks, etc.), run the following commands:

```bash
# 1. Push the Prisma schema to your Neon database

npx prisma db push

# 2. Run the seed script to populate the database with mock data
npx prisma db seed
```

## Running the Server

Start the Fastify server in development mode (with auto-reload):
```bash
npm run dev
```

To run in production mode:
```bash
npm start
```
The backend will run on `http://localhost:3001`.
