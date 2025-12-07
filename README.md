# Task Management App — Full Stack Developer Intern Case Study

A full-stack task management application built as part of the **Full Stack Developer Intern Case Study**. This project demonstrates proficiency in **React**, **Node.js**, **Express**, **PostgreSQL**, **Prisma**, **JWT authentication**, form validation, and automated testing.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- TailwindCSS
- Redux Toolkit
- Axios
- React Hook Form + Zod

### Backend
- Node.js + Express (TypeScript)
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Bcrypt
- Zod (validation)

### Testing
- Jest
- Supertest (backend)
- React Testing Library (frontend)

---

## 📌 Features

### Authentication
- Register  
- Login  
- JWT-secured routes  
- Token stored in **localStorage** (per assignment)

### Task Management
- Create task  
- Read tasks  
- Update task  
- Delete task  
- Each user can access **only their own tasks**

### Validation
- Zod schema validation  
- Friendly error messages  
- Protected API routes  

---

## 📁 Project Structure

```bash
project/
├── backend/
│ ├── package.json
│ ├── tsconfig.json
│ ├── src/
│ │ ├── index.ts
│ │ ├── app.ts
│ │ ├── config/db.ts
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── models/
│ │ └── middleware/
└── frontend/
├── package.json
├── vite.config.js
├── index.html
├── src/
│ ├── main.jsx
│ ├── App.jsx
│ ├── index.css
│ ├── api/axios.js
│ ├── pages/
│ ├── components/
│ └── styles/
```

---

## 🛠️ Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/PriyanshuYadav08/Task_Management_Application.git
cd Task_Management_Application
```

---

## 🧰 Prerequisites

Install these before running the project -

- **Node.js** (v18+ recommended)  
- **npm** (comes with Node)  
- **Git**  
- **MongoDB Atlas account** (recommended) OR local MongoDB  
- (Optional) **mongosh** or MongoDB Compass for debugging  

---

# 🚀 Getting Started (Local Development)

You will run the backend and frontend separately.

---

# 🔧 Backend Setup

## Navigate to backend folder
```bash
cd backend
npm install
npm install express mongoose bcrypt jsonwebtoken dotenv cors helmet express-async-handler zod
npm install -D typescript ts-node-dev @types/node @types/express @types/bcrypt @types/jsonwebtoken @types/cors
```

---

# Frontend Setup

## Navigate to frontend folder
```bash
cd frontend
npm install
npm install react react-dom react-router-dom axios react-hook-form
npm install -D vite @vitejs/plugin-react
```