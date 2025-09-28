# Nest Microservice

## 📌 Overview

This project is a **NestJS microservice** built with **Prisma** and **PostgreSQL**.  
It supports updating or inserting records (Upsert), validation with **Zod**, and exposes API documentation via **Swagger**.

---

## ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup PostgreSQL and update `.env`**

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   ```

4. **Run Prisma migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the app**

   ```bash
   npm run start:dev
   ```

6. **Swagger docs available at**
   [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 📖 API Documentation

* **Update or Insert a Record**

  ```http
  POST /update
  Content-Type: application/json
  ```

* Example Request Body:

  ```json
  {
    "id": 3,
    "name": "Record1",
    "create_date": "2025-09-25T09:00:00Z",
    "location": {
      "latitude": 32.0853,
      "longitude": 34.7818
    },
    "alerts": [101, 102],
    "status": 1,
    "description": "Test record"
  }
  ```

---

## 📊 Features

* ✅ Upsert (Update if exists, otherwise Insert)
* ✅ PostgreSQL integration with Prisma
* ✅ Request validation using Zod
* ✅ Centralized logging with NestJS Logger
* ✅ API documentation with Swagger

---

## 🛠 Tech Stack

* [NestJS](https://nestjs.com/)
* [Prisma ORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Zod](https://zod.dev/)
* [Swagger](https://swagger.io/)

---

## 🚀 Available Scripts

* `npm run start` → Run in production mode
* `npm run start:dev` → Run in development mode with hot-reload
* `npm run build` → Build the project
* `npm run test` → Run tests

---

## ✅ Example JSON

```json
{
  "id": 1,
  "name": "Sample Record",
  "create_date": "2025-09-25T09:00:00Z",
  "location": {
    "latitude": 32.0853,
    "longitude": 34.7818
  },
  "alerts": [101, 102],
  "status": 2,
  "description": "Example record for documentation"
}
```

---

## 👤 Author

Developed by **Ayala Tal**





````
