# Todo Calendar

A full-stack productivity app that combines a **todo list** with a **calendar view** — built with React, Firebase, and Tailwind CSS.

---

## Features

- **Authentication** — Sign up and log in with email & password (Firebase Auth)
- **Task Management** — Add, complete, and delete tasks with optional due dates
- **Calendar View** — See all your scheduled tasks on an interactive monthly calendar
- **Date Linking** — Click any calendar date to filter tasks and auto-fill the date input
- **Filter Tabs** — View All, Active, or Completed tasks
- **Progress Bar** — Visual completion tracker at the top of the task list
- **Responsive** — Side-by-side on desktop, tabbed on mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Create React App) |
| Styling | Tailwind CSS |
| Auth | Firebase Authentication |
| Database | Cloud Firestore |
| Calendar | react-big-calendar |
| Routing | React Router v7 |

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd todo-calender
npm install
```

### 2. Configure Firebase

#### Step 1 — Create a Firebase Project

1. Go to [firebase.google.com](https://firebase.google.com) and click **Add project**
2. Enter a project name (e.g. `todo-calender-react`)
3. Disable Google Analytics if not needed → **Create project**

#### Step 2 — Register a Web App

Inside your project, click the **`</>`** (Web) icon → give it a nickname → **Register app**.

Firebase gives you a config object — paste it into `src/firebase/config.js`:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

#### Step 3 — Enable Authentication

**Authentication** → **Sign-in method** → Enable **Email/Password**  
- First toggle → **ON**  
- Second toggle (Email link / passwordless) → **OFF**

#### Step 4 — Create Firestore Database

**Firestore Database** → **Create database** → select **Test mode** → choose a region → **Done**

> The `todos` collection is auto-created the first time you add a task — no manual setup needed.

#### Step 5 — Composite Index (required for Calendar)

The calendar query filters by `uid` AND `date != null`, which requires a Firestore composite index.  
On first load, the **browser console** prints a direct link — click it and Firebase creates the index automatically (takes ~1 minute).

### 3. Run the app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in Chrome.

> **Note:** Use Chrome for development. Brave's shields block Firestore on localhost.

---

## Project Structure

```
src/
├── firebase/
│   └── config.js           # Firebase initialization
├── context/
│   └── AuthContext.js      # Auth state (login, signup, logout)
├── components/
│   ├── Layout/
│   │   ├── Navbar.js       # Top navigation bar
│   │   └── ProtectedRoute.js
│   ├── Todo/
│   │   └── TodoList.js     # Task list with filters and date linking
│   └── Calendar/
│       └── CalendarView.js # Monthly calendar synced with tasks
├── pages/
│   ├── LoginPage.js
│   ├── SignupPage.js
│   └── DashboardPage.js    # Main layout (desktop/mobile)
└── App.js                  # Route definitions
```

---

## Usage

1. **Sign up** with your email and password
2. **Add a task** — type a name, optionally pick a date, click `+ Add`
3. **Click a calendar date** — the task list filters to that date and the date input auto-fills
4. **Check off tasks** to mark them complete
5. **"Show all"** in the task list banner to clear the date filter

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Production build |
| `npm test` | Run tests |
