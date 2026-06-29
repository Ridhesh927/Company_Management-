# CrewFlow

CrewFlow is a comprehensive intern and company management platform. It streamlines task assignments, tracks attendance, verifies proofs, handles documents and provides real-time analytics.

## Recent Features Added
- **Analytics & Performance Dashboard:** Live visual charts implemented in the frontend using `recharts` to track ratings, tasks, and team averages.
- **Sub-tasks / Checklists:** Nested sub-tasks inside of main tasks so interns can keep track of their progress piece by piece.
- **Resource / Document Hub:** Integrated `@fastify/multipart` and `cloudinary` so managers can upload and share PDFs and other resources directly to the cloud.
- **Gamification & Leaderboard:** Interns gain points upon proof verification, and a leaderboard highlights top performers.

## Prerequisites
- Node.js (v18+)
- PostgreSQL (Neon Database used natively via Prisma)
- Cloudinary Account (for file uploads)

## Environment Variables
Create a `.env` file in the `backend` directory. The following variables are required for the newly added features:

```env
# Database configuration
DATABASE_URL="postgresql://user:password@host/db_name"

# JWT configuration
JWT_SECRET="your_jwt_secret"

# Cloudinary Integration (Required for Document Uploads)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

## Setup Instructions

### 1. Backend Setup
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Push the Prisma schema to your database (Make sure your `.env` is configured):
```bash
npx prisma db push
```

Start the backend development server:
```bash
npm run dev
```

### 2. Frontend Setup
Navigate to the `frontend` folder and install dependencies:
```bash
cd frontend
npm install
```
*(Note: `recharts` is now required for the Analytics dashboards)*

Start the frontend development server:
```bash
npm run dev
```

## Running the Application
Once both servers are running, the frontend will be available at `http://localhost:3000` (or the port specified by Next.js), and it will communicate with the Fastify backend API.
