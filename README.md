# OpenCodex Talent API

<div align="center">
  <h3>Powered by NestJS and Prisma</h3>
  <p>The robust, type-safe, and highly scalable REST API driving the OpenCodex Talent platform.</p>
</div>

---

## 🎯 Overview

This repository folder (`/nestjs`) contains the core backend services. It is responsible for user authentication, strict data validation, Role-Based Access Control (RBAC), and persisting developer portfolios securely in a PostgreSQL database using Prisma ORM.

## 💡 Why NestJS & Prisma?

NestJS was strictly chosen over Express to enforce an **opinionated, scalable architecture** capable of handling open-source contributions seamlessly. Its Angular-like modularity ensures clear segregation of responsibilities, while Prisma provides end-to-end type safety directly mapped to our PostgreSQL schema.

## 🛠 Tech & Architecture

- **Framework:** NestJS 10+
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** Passport & `@nestjs/jwt` strategies
- **API Documentation:** Swagger / OpenAPI
- **Validation:** Explicit DTOs with `class-validator` and `class-transformer`

### Core Modules
1. **AuthModule**: Manages user registration, login, JWT issuance, and payload validation.
2. **DeveloperModule**: Handles searching developers (with strict `limit` and `page` filters), and updating profiles (seniority, role, avatars, availability).
3. **ProjectModule**: Full CRUD for developer portfolios.
4. **SkillModule**: Central catalogue for assigning skills to developers.

## 🔒 Security & Authorization

All secure endpoints utilize custom guards (`JwtAuthGuard`). 
Furthermore, the platform enforces **RBAC (Role-Based Access Control)** using Prisma enums (`USER` vs `ADMIN`). Only users with the `ADMIN` systemRole property encoded in their JWT can access admin-specific backend mutations (e.g., creating universal skills).

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **Docker** (recommended for running PostgreSQL locally)
- **PostgreSQL** (if not using Docker)

### Installation

1. **Navigate to the API folder**
   ```bash
   cd nestjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the `nestjs` directory:
   ```env
   # Example PostgreSQL Connection
   DATABASE_URL="postgresql://postgres:password@localhost:5432/opencodex_talent?schema=public"
   
   # JWT Secret
   JWT_SECRET="super-secret-key-change-me"
   
   # Port
   PORT=5000
   ```

4. **Initialize Prisma (Database Sync)**
   Ensure your Postgres database is running, then deploy the schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the API Server**
   ```bash
   npm run start:dev
   ```

   The server will run at `http://localhost:5000/api/v1`.

## 📚 API Documentation (Swagger)

A fully interactive OpenAPI specification is bundled automatically. 

With the development server running, navigate to:
**👉 `http://localhost:5000/api/docs`**

You can visually explore all available endpoints, DTO schemas, and even emit test requests directly from the UI.

## 📦 Database Schema Details

The core entities are represented in Prisma as follows:

- **Users**: Authentication entity containing credentials and System Roles.
- **DeveloperProfiles**: Holds the actual visible information (`username`, `bio`, `seniority`, `role`, `location`, `avatarSeed`).
- **Projects**: Belongs to a single developer, showcasing their repository (`repoUrl`) and live builds (`productionUrl`).
- **Skills**: Global lookup table linked through a many-to-many relationship with DeveloperProfiles.

---
*Built for the OpenCodex community.*
