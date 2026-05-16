# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A todo/calendar app built with Create React App (JavaScript), Firebase Auth, Firestore, Tailwind CSS, and react-big-calendar.

## Commands

```bash
npm start        # Start development server (localhost:3000)
npm test         # Run tests in watch mode
npm run build    # Production build to /build
```

> Always restart the dev server after installing new packages — CRA's PostCSS pipeline (Tailwind) is initialized at startup.

## Architecture

```
src/
  firebase/config.js        # Firebase app, auth, and db exports
  context/AuthContext.js    # Auth state via React context (login, signup, logout)
  components/
    Layout/
      Navbar.js             # Sticky top bar with user avatar and logout
      ProtectedRoute.js     # Redirects unauthenticated users to /login
    Todo/TodoList.js        # Task list — add, complete, delete, filter, date-filter
    Calendar/CalendarView.js # react-big-calendar view synced with Firestore todos
  pages/
    LoginPage.js            # Email/password sign-in
    SignupPage.js           # Account creation
    DashboardPage.js        # Side-by-side layout (desktop) / tabbed (mobile)
  App.js                    # Routes: /login, /signup, / (protected dashboard)
  index.css                 # Tailwind directives + react-big-calendar overrides
```

## Key behaviours

- **Date linking** — clicking a calendar date filters the todo list and auto-fills the date input so new tasks land on that date. "Show all" clears the filter.
- **Firestore collection** — `todos` is auto-created on first task add. Each document has: `uid`, `text`, `date` (YYYY-MM-DD or null), `completed`, `createdAt`.
- **Sorting** — todos are sorted client-side by `createdAt` descending (no Firestore composite index needed for the list query).
- **Firestore index required** — the CalendarView query (`uid` + `date != null`) needs a composite index. Firebase prints a direct link to create it in the browser console on first run.
- **Browser** — use Chrome for development. Brave's shields block Firestore connections on localhost.

## Firebase setup

- Project ID: `todo-calender-react`
- Auth: Email/Password enabled (passwordless sign-in disabled)
- Firestore: test mode, default database
