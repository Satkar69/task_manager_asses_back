# 🧠 Task Manager Backend

This is the backend of a full-stack Task Manager application. Built with **Node.js**, **Express.js**, and **Prisma ORM**, it serves secure REST APIs to handle user authentication, task management, and business logic.

> 🔗 Frontend: [task_manager_asses_front](https://github.com/Satkar69/task_manager_asses_front)

---

## 📦 Tech Stack

- **Express.js** – Web framework
- **Prisma ORM** – Type-safe database access
- **PostgreSQL** – NeonDB serverless postgresql
- **JWT** – Authentication
- **Nodemon** – Hot-reloading during development
- **Morgan** – Logging
- **dotenv, cors, cookie-parser** – Middleware utilities

---

## 📁 Folder Structure

```bash
├── application/
│   ├── controllers/         # Request handlers for different routes
│   ├── exception/           # Global error handling logic
│   └── routes/              # API route definitions
│
├── lib/                     # Custom utility functions (e.g., JWT handling)
│
├── middlewares/            # Middleware functions like auth, validation
│
├── prisma/                 # Prisma schema and migration files
│
├── use-cases/
│   └── user-use-cases/     # Business logic for user operations
│
├── utils/                  # Helper classes like CustomError
│
├── server.js               # Main entry point and server config
├── package.json
└── .gitignore
└── readme.md
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Satkar69/task_manager_asses_back.git
cd task_manager_asses_back

# 2. Install dependencies
npm install

# 3. Set up the database
npx prisma generate
npx prisma db pull  # or use prisma migrate

# 4. Start development server
npm run dev
```
