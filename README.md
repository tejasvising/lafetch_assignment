# Task Dashboard (React + Vite)

A responsive frontend-only Task Management Dashboard built with **React**, **Vite**, **TailwindCSS**, and **React Query**. This project uses a mocked backend (JSON Server) for tasks and users.

## Features ✅

- Login (mocked)
- Role-based UI (admin / user)
- Tasks list with search, status filter, and pagination
- Task details drawer/modal (admin can edit full task; user can change status)
- Create Task (admin only)
- Responsive layout: sidebar on desktop, navbar/menu on mobile

---

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

Important endpoints:
- `GET /users` — list users (login uses `GET /users?email=` to validate)
- `GET /tasks` — list tasks
- `POST /tasks` — create a task
- `PATCH /tasks/:id` — update a task

If you need to change the API base URL, update `src/api/axios.js` (or add `VITE_API_BASE_URL` and wire it into that file).

---

## Scripts 🧾

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build

---

## Notes & Next Steps ✨

- Validation is basic; consider adding Formik or React Hook Form advanced validation for production.
- Add unit tests for `Login`, `Tasks`, or `CreateTask` components.
- Add `.env.example` for environment variables (e.g., `VITE_API_BASE_URL=http://localhost:3000`).

---

## Troubleshooting ⚠️

- `File db.json not found`: make sure you run JSON Server from the folder that contains `db.json` or provide the relative path to the file.
- CORS issues: JSON Server generally serves on localhost — if you change ports, update `src/api/axios.js`.

---

## Contributing

Contributions welcome — open a PR with improvements, bug fixes, or tests.

---

License: MIT

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
