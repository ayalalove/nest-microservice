# Nest Microservice

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup PostgreSQL and update `.env` with your DB connection string:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   ```

3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

4. Start the app:
   ```bash
   npm run start:dev
   ```

5. Swagger docs available at: [http://localhost:3000/docs](http://localhost:3000/docs)
