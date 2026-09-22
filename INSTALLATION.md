# PlanBuddy Installation Guide

## Prerequisites

Before running PlanBuddy, install:

* Node.js and npm
* Python 3.10+
* PostgreSQL
* Git

## 1. Clone the Repository

```bash
git clone https://github.com/ShizzyE/2603-WDV349-Ellis.git
cd 2603-WDV349-Ellis
```

## 2. Install Frontend

Navigate to the frontend:

```bash
cd dev/Client
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:3000
```

## 3. Install Backend

Open a second terminal and navigate to the backend:

```bash
cd dev/server
```

Create and activate a Python virtual environment.

### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

## 4. Environment Variables

Create a `.env` file inside `dev/server`:

```env
DATABASE_URL=your_postgresql_database_url
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET_KEY=your_secret_key
```

Do not commit `.env` or `.env.local` files to GitHub.

## 5. Database

Create a PostgreSQL database for PlanBuddy.

Example:

```sql
CREATE DATABASE planbuddy_db;
```

Update `DATABASE_URL` in the backend `.env` file with your PostgreSQL connection information.

## 6. Start the Backend

From `dev/server`:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://localhost:8000
```

FastAPI documentation is available at:

```text
http://localhost:8000/docs
```

## 7. Running PlanBuddy

Both servers must be running:

**Frontend**

```text
http://localhost:3000
```

**Backend**

```text
http://localhost:8000
```

The frontend communicates with the backend through `NEXT_PUBLIC_API_URL`.

## Troubleshooting

**__If the application does not work:__**

1. Make sure PostgreSQL is running.
2. Verify the `.env` and `.env.local` values.
3. Make sure both frontend and backend servers are running.
4. Check the browser console for frontend errors.
5. Check the FastAPI terminal for backend errors.
