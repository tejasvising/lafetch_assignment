# Task Dashboard 

A responsive frontend-only Task Management Dashboard. This project uses a mocked backend (JSON Server) for tasks and users.

## Prerequisites 🧰

- Node.js 18+ and npm
- npx (bundled with npm)

---

## Quickstart — Run locally 🚀

1. Clone the repo and change to the project folder:

```bash
cd task-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the mock API (JSON Server):

```bash
npx json-server --watch db.json --port 3000
```

> Tip: If you run the command from the repo root, point to the file path: `npx json-server --watch task-dashboard/db.json --port 3000`.

4. Start the frontend dev server:
   
```bash
cd task-dashboard
```

```bash
npm run dev
```

5. Open the app in your browser (Vite will show the URL, typically):

```
http://localhost:5173
```

---

## Demo Accounts (for quick testing) 🔐

- Admin
  - Email: **admin@test.com**
  - Password: **adminpass**
  - Role: admin

- Regular User
  - Email: **jane@test.com**
  - Password: **userpass**
  - Role: user

Notes: Login is mocked against the `users` collection in `db.json`.

---

## API & Mock Server 📡

The app expects a JSON Server running at `http://localhost:3000`.
