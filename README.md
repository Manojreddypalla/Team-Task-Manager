# Team Task Manager

A simple full-stack Team Task Management System built using Astro, Prisma, PostgreSQL, and JWT Authentication.

---

# Features

## Authentication

- Login system
- JWT-based authentication
- Protected routes using middleware
- Role-based access control

---

## Roles

### Admin

Admin can:

- Create users
- Create projects
- Create tasks
- Assign tasks to members
- View all projects
- View project-specific tasks
- Track task progress

### Member

Member can:

- View assigned tasks
- Update task status
- Track own work progress

---

# Tech Stack

- Astro
- Prisma ORM
- PostgreSQL
- JWT
- bcryptjs
- TypeScript

---

# Database Models

## User

- name
- email
- password
- role

## Project

- name
- description
- owner

## Task

- title
- description
- status
- assignee
- project

---

# Project Structure

```bash
src/
 ├── pages/
 │    ├── admin/
 │    ├── member/
 │    ├── api/
 │
 ├── lib/
 │    └── prisma.ts
 │
 ├── middleware.ts
 │
prisma/
 └── schema.prisma
```

---

# Installation

## Clone Repository

```bash
git clone <repo-url>
cd TEAM-TASK-MANAGER
```

---

## Install Dependencies

```bash
npm install
```

---

## Setup Environment Variables

Create `.env`

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/task_manager_db"

JWT_SECRET="supersecretkey"
```

---

# Prisma Setup

## Push Database

```bash
npx prisma db push
```

## Generate Prisma Client

```bash
npx prisma generate
```

---

# Run Project

```bash
npm run dev
```

---

# Default Admin Account

```txt
Email:
admin@test.com

Password:
password
```

---

# API Routes

## Auth

- POST `/api/auth/login`
- POST `/api/auth/logout`

## Users

- POST `/api/users/create`

## Projects

- POST `/api/projects/create`

## Tasks

- POST `/api/tasks/create`
- POST `/api/tasks/update`

---

# Middleware

Middleware is used for:

- JWT verification
- Route protection
- Role-based authorization
- User session handling

---

# Admin Pages

- `/admin/dashboard`
- `/admin/users`
- `/admin/projects`
- `/admin/tasks`

---

# Member Pages

- `/member/dashboard`

---

# Task Status Flow

```txt
PENDING
   ↓
IN_PROGRESS
   ↓
COMPLETED
```

---

# Future Improvements

- Edit/Delete projects
- Edit/Delete tasks
- User profile system
- Notifications
- File uploads
- Activity logs
- Better dashboard analytics
- Kanban board

---

# Deployment

Can be deployed using:

- Railway
- Render
- Vercel
- Docker

---

# Author

Built as a fast full-stack assessment project using Astro + Prisma + PostgreSQL.