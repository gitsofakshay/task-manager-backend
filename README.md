# 📝 Task Manager Backend

This is the backend of a simple Task Manager Web Application built with **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**. It supports user authentication and CRUD operations on tasks, allowing users to manage their work in a status-driven flow: `To Do → In Progress → Done`.

---

## 🚀 Features

- ✅ User Signup & Login (with JWT authentication)
- ✅ Password hashing using bcrypt
- ✅ Create, Read, Update, Delete tasks
- ✅ Task status flow: `TO_DO → IN_PROGRESS → DONE`
- ✅ API protection with middleware
- ✅ PostgreSQL + Prisma ORM
- ✅ Environment configuration via `.env`

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT + bcrypt
- **Others**: CORS, dotenv, nodemon

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/gitsofakshay/task-manager-backend.git
cd task-manager-backend
```
### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a .env file in the root:

```bash
PORT=5000
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
```
### 4. Set up the database
(A) Initialize Prisma

```bash
npx prisma generate
```
(B) Push schema to database

```bash
npx prisma migrate dev --name init
```
⚠️ Or use npx prisma db push if you're using Prisma Accelerate.

### 5. Start the development server
```bash
npm run dev
```
---

## 📮 API Endpoints
🔐 Auth
Method	Endpoint	Description
| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| POST   | `/api/signup` | Register a new user |
| POST   | `/api/login`  | Login and get token |

📌 Tasks (JWT Required)
| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/api/tasks`     | Get all tasks      |
| POST   | `/api/tasks`     | Create new task    |
| PUT    | `/api/tasks/:id` | Update task status |
| PATCH  | `/api/tasks/:id` | Edit task title    |
| DELETE | `/api/tasks/:id` | Delete task        |

---

### 📂 Project Structure

```bash
task-manager-backend/
├── controllers/
├── middleware/
├── routes/
├── prisma/
│   └── schema.prisma
├── .env
├── app.js
└── package.json
```
---

### 🧑‍💻 Author
Akshay Raj Kushwaha

---

### License
This project is licensed under the ISC License

---
