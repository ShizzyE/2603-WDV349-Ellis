# PlanBuddy

> An AI-powered productivity application designed to help users organize tasks, deadlines, notes, and schedules in one workspace.

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Technologies](#technologies)
* [Application Architecture](#application-architecture)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
  * [Clone the Repository](#clone-the-repository)
  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
  * [Environment Variables](#environment-variables)
* [Running the Application](#running-the-application)
* [AI Assistant](#ai-assistant)
* [Task Management](#task-management)
* [Authentication](#authentication)
* [Project Structure](#project-structure)
* [API Overview](#api-overview)
* [Security](#security)
* [Known Limitations](#known-limitations)
* [Future Improvements](#future-improvements)

---

## Overview

PlanBuddy is an AI-powered productivity application built to bring task management, scheduling, notes, and AI assistance into one workspace. 

The goal of PlanBuddy is to reduce the amount of time users spend organizing their work so they can spend more time actually completing it.

PlanBuddy combines a modern Next.js frontend with a FastAPI backend, a Postgresql database-backed task system, and an AI assistant powered through the OpenAI Agents SDK.

The application is designed primarily for individual users rather than team-based project management.

---

## Features

### Task Management

* Create tasks
* Edit existing tasks
* Delete tasks
* Update task status
* Update task priority
* Update task labels
* Set start and due dates
* Add descriptions and notes
* View overdue tasks
* Sort and filter tasks
* Search tasks
* Track task completion progress

### Dashboard

The Dashboard provides a quick overview of active and completed work.

It includes:

* Completed task progress
* Priority-based active tasks
* Overdue tasks
* Task editing
* Task deletion
* Inline task updates

### Planning

The Planning page provides a detailed workspace for managing tasks.

Users can:

* Create new tasks
* Edit tasks directly from their task cards
* Search tasks
* Filter by priority
* Filter by label
* Filter by status
* Sort by due date, priority, or title

### AI Assistant

PlanBuddy includes an AI assistant that allows users to interact with their productivity data through natural language.

The current AI functionality focuses on retrieving tasks and updating tasks while keeping database operations associated with the authenticated user.

---

## Technologies

### Frontend

| Technology    | Purpose                                 |
| ------------- | --------------------------------------- |
| Next.js       | React framework and application routing |
| React         | User interface                          |
| TypeScript    | Static typing                           |
| Tailwind CSS  | Styling                                 |
| shadcn/ui     | Reusable UI components                  |
| Lucide React  | Icons                                   |
| Framer Motion | UI animations                           |
| Redux Toolkit | Client-side authentication state        |

### Backend

| Technology        | Purpose                         |
| ----------------- | ------------------------------- |
| Python            | Backend programming language    |
| FastAPI           | REST API framework              |
| Postgresql        | Database                        |
| SQLAlchemy        | Database ORM                    |
| Pydantic          | Request and response validation |
| OpenAI Agents SDK | AI agent functionality          |
| Uvicorn           | ASGI development server         |

### Development Tools

| Tool    | Purpose                              |
| ------- | ------------------------------------ |
| Git     | Version control                      |
| GitHub  | Repository hosting and collaboration |
| Postman | API development and debugging        |

---

## Application Architecture

PlanBuddy uses a frontend/backend architecture where the Next.js application communicates with the FastAPI API.

```text
┌─────────────────────┐
│       User          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Next.js Frontend  │
│                     │
│  Dashboard          │
│  Planning           │
│  Calendar           │
│  Settings           │
│  AI Assistant       │
└──────────┬──────────┘
           │
           │ HTTP Requests
           ▼
┌─────────────────────┐
│    FastAPI Backend  │
│                     │
│  Authentication     │
│  Task Routes        │
│  User Routes        │
│  AI Services        │
└──────────┬──────────┘
           │
      ┌────┴─────┐
      ▼          ▼
┌──────────┐  ┌────────────────┐
│ Database │  │ OpenAI Agent   │
│          │  │                │
│ Users    │  │ Task Tools     │
│ Tasks    │  │ AI Responses   │
└──────────┘  └────────────────┘
```

### Request Flow

A typical task request follows this pattern:

```text
User Action
    │
    ▼
Next.js Component
    │
    ▼
task-api.ts
    │
    ▼
FastAPI Route
    │
    ▼
Database
    │
    ▼
API Response
    │
    ▼
React State
    │
    ▼
Updated UI
```

AI requests use a similar flow:

```text
User
  │
  ▼
AI Assistant
  │
  ▼
FastAPI AI Service
  │
  ▼
OpenAI Agent
  │
  ▼
Authorized Task Tool
  │
  ▼
Database
  │
  ▼
Agent Response
  │
  ▼
Frontend
```

---

# Getting Started

## Prerequisites

Before running PlanBuddy, make sure the following are installed:

* Node.js
* npm
* Python 3
* Git

You will also need an OpenAI API key if you want to use the AI functionality.

---

## Clone the Repository

Clone the repository and enter the project directory:

```bash
git clone https://github.com/ShizzyE/2603-WDV349-Ellis.git
cd 2603-WDV349-Ellis
```

The project contains separate frontend and backend applications:

```text
2603-WDV349-Ellis/
├── dev/
│   ├── Client/
│   └── server/
└── ...
```

---

## Backend Setup

Open a terminal and navigate to the server:

```bash
cd dev/server
```

Create a Python virtual environment:

```bash
python3 -m venv .venv
```

Activate the virtual environment.

### macOS / Linux

```bash
source .venv/bin/activate
```

### Windows

```powershell
.venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

The backend should now be available at:

```text
http://localhost:8000
```

FastAPI's interactive API documentation is available at:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

Open a second terminal and navigate to the frontend:

```bash
cd dev/Client
```

Install the Node.js dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

The frontend should now be available at:

```text
http://localhost:3000
```

Keep both development servers running while using the application.

---

## Environment Variables

PlanBuddy uses environment variables for configuration and secrets.

Create the appropriate environment files based on the environment files included with the project.

### Frontend

The frontend API origin should be configured through an environment variable rather than hard-coding the backend URL.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend

The backend requires configuration for services used by the application, including the OpenAI API.

Example:

```env
OPENAI_API_KEY=your_openai_api_key
```

> **Important:** Never commit real API keys, passwords, or other secrets to GitHub.

---

# Running the Application

PlanBuddy requires both the frontend and backend development servers.

### Terminal 1 — Backend

```bash
cd dev/server
source .venv/bin/activate
uvicorn app.main:app --reload
```

### Terminal 2 — Frontend

```bash
cd dev/Client
npm run dev
```

Then open the application in your browser:

```text
http://localhost:3000
```

---

# AI Assistant

PlanBuddy uses the OpenAI Agents SDK to provide an AI assistant that can interact with application data.

The AI agent is designed around the authenticated user's context.

A simplified representation of the AI architecture is:

```text
                    ┌──────────────────┐
                    │   PlanBuddy AI   │
                    │     Assistant    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Agent Runner   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Authorized Tools │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  PlanBuddy DB    │
                    └──────────────────┘
```

The backend provides the agent with context containing information needed to associate database operations with the authenticated user.

For example:

```python
@dataclass
class PlanBuddyContext:
    db: Session
    user_id: int
```

This allows database operations to be performed within the context of the authenticated user.

The AI functionality is intentionally restricted to specific tools rather than giving the agent unrestricted database access.

---

# Task Management

Tasks contain information such as:

```text
ID
title
description
notes
priority
label
status
start_date
due_date
created_at
updated_at
completed_at
```

### Statuses

PlanBuddy currently supports:

```text
Not Started
In Progress
Delayed
Completed
```

### Priorities

```text
High
Medium
Low
```

### Labels

```text
School
Work
Personal
Faith
Business
```

---

# Authentication

PlanBuddy uses authentication to associate application data with the current user.

The frontend maintains authentication-related state through Redux.

The authentication state contains information such as:

```typescript
type AuthState = {
  isAuth: boolean
  id: number | null
  username: string
  email: string
  isModerator: boolean
}
```

The authenticated user is used by the backend when handling protected resources.

Task operations should therefore be performed within the context of the authenticated user rather than allowing the frontend to determine which user's data can be accessed.

---

# Project Structure

A simplified project structure looks like this:

```text
2603-WDV349-Ellis/
│
├── dev/
│   │
│   ├── Client/
│   │   ├── app/
│   │   │   └── (app)/
│   │   │       ├── dashboard/
│   │   │       ├── planning/
│   │   │       └── ...
│   │   │
│   │   ├── components/
│   │   │   ├── task-card.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── ...
│   │   │
│   │   ├── lib/
│   │   │   └── task-api.ts
│   │   │
│   │   ├── package.json
│   │   └── ...
│   │
│   └── server/
│       ├── app/
│       │   ├── models/
│       │   │   ├── task.py
│       │   │   └── user.py
│       │   │
│       │   ├── routes/
│       │   │   ├── auth.py
│       │   │   ├── tasks.py
│       │   │   └── users.py
│       │   │
│       │   ├── schemas/
│       │   ├── services/
│       │   ├── db/
│       │   └── main.py
│       │
│       ├── requirements.txt
│       └── ...
│
└── README.md
```

---

# API Overview

The FastAPI backend provides endpoints for application resources.

### Task Endpoints

```text
GET     /tasks/
POST    /tasks/
PUT     /tasks/{task_id}
DELETE  /tasks/{task_id}
```

Authentication endpoints handle user registration and login.

```text
http://localhost:8000/docs
```

The API documentation is useful during development because endpoints can be tested independently from the frontend.

---

# Security

Security is an important part of PlanBuddy because the application combines authenticated user data with AI functionality.

### Authentication

Protected resources should require an authenticated user.

### User-Specific Data

Task operations are associated with the authenticated user's ID.

### AI Permissions

The AI agent should only have access to the tools it actually needs.

PlanBuddy intentionally limits the AI's available functionality instead of providing unrestricted database access.

### Prompt Injection

AI systems can be manipulated through malicious instructions contained in user input or retrieved data.

PlanBuddy considers prompt injection as part of its AI security model and aims to constrain model behavior through explicit tools and backend authorization.

### Input and Output Validation

API and AI inputs should be validated before database operations are performed.

Application code should also avoid assuming that an external API or AI response is always complete or correctly formatted.

### Secrets

API keys and other secrets should be stored in environment variables and should never be committed to the repository.

---

# Known Limitations

PlanBuddy is currently a development/beta application, so some areas are still being refined.

Current limitations include:

* AI functionality is intentionally limited to a small set of task operations.
* Some features are still being refined as part of the beta release.
* The application is primarily designed for individual users rather than collaborative team management.
* External API responses still require validation before being stored in application state.
* Additional security hardening and production configuration are still planned.

---

# Future Improvements

Potential future improvements include:

* Expanded AI task management
* More advanced calendar scheduling
* Improved AI planning and prioritization
* Additional task and calendar views
* More robust rate limiting
* Additional AI input/output validation
* Expanded protection against prompt injection
* More granular AI permissions
* Improved production deployment configuration
* Additional analytics and AI usage metrics
* Continued UI and accessibility improvements

---

## Development Philosophy

PlanBuddy is being developed with an emphasis on simplicity, maintainability, and security.

The application prioritizes a smaller set of reliable features rather than adding functionality without considering how it affects the overall system.

As the project moves toward beta, the focus is on keeping the frontend, backend, database, and AI agent connected through clear boundaries and predictable data flows.

```text
Frontend
   ↓
API
   ↓
Backend
   ↓
Database / AI Agent
   ↓
Validated Response
   ↓
Frontend
```

The goal is for PlanBuddy to remain easy to understand and maintain while providing useful AI-powered productivity features.
