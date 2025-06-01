# Pet Feeding App – Frontend

This is the **README** for the **Pet Feeding App** frontend.  
It explains how to **install, configure, run, and deploy** the React + Vite application that lets users manage pets, foods, and low-stock notifications.

**Live demo:** <https://petfeedingapp.vercel.app>

---

## ⚙️ Tech Stack

| Layer               | Library / Tool                       |
| ------------------- | ------------------------------------ |
| **Framework**       | React 18 +                           |
| **Bundler / Dev**   | Vite 4 +                             |
| **Styling**         | Tailwind CSS 3                       |
| **Routing**         | React Router 6                       |
| **State / API**     | Custom hooks (`useAuth`, `useFoods`, `usePets`, `useNotifications`) + `fetch()` client |
| **Auth**            | JWT in `localStorage`                |
| **Assets**          | Static `.png` files (`public/assets/images/`) |
| **Deployment**      | Vercel                               |

---

## 🏠 Project Structure

```text
frontend/
├── public/
│   ├── assets/
│   │   └── images/
│   │       ├── Pets.png
│   │       ├── Food.png
│   │       ├── Notifications.png
│   │       └── logo.png
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── api/
│   │   ├── auth.js
│   │   ├── foods.js
│   │   ├── pets.js
│   │   └── notifications.js
│   │
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── Foods/
│   │   │   ├── FoodForm.jsx
│   │   │   ├── FoodItem.jsx
│   │   │   └── FoodList.jsx
│   │   ├── Pets/
│   │   │   ├── PetForm.jsx
│   │   │   ├── PetItem.jsx
│   │   │   └── PetList.jsx
│   │   ├── Notifications/
│   │   │   ├── NotificationBanner.jsx
│   │   │   └── NotificationList.jsx
│   │   └── Layout/
│   │       └── NavBar.jsx
│   │
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFoods.js
│   │   ├── usePets.js
│   │   └── useNotifications.js
│   │
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── FoodsPage.jsx
│   │   ├── PetsPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   │
│   ├── utils/
│   │   └── apiClient.js
│   │
│   ├── index.css
│   ├── main.jsx
│   └── App.jsx
│
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── vite.config.js

## 📦 Installation
Clone the repository (frontend only):

git clone https://github.com/AraMyst/PetFeedingApp.git
cd PetFeedingApp/frontend
Install dependencies:

npm install
Environment variables:

Create a .env file inside frontend/:

VITE_API_URL=https://petfeedingapp.onrender.com
For a local backend at localhost:4000:

VITE_API_URL=http://localhost:4000
## 🚀 Running Locally

npm run dev
The Vite dev-server normally starts at http://localhost:5173/.

## 📜 Available Scripts
Script	Description
npm run dev	Start dev server with HMR
npm run build	Create production build in dist/
npm run preview	Serve the build locally (after npm run build)

## 🧰 Tailwind Setup

// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
}
Override breakpoints if needed:


theme: {
  extend: {
    screens: {
      sm: '500px',
      md: '600px',
      lg: '1024px',
      xl: '1280px',
    },
  },
}
Global styles (src/index.css):

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: #dbf3f6;
    min-height: 100vh;
  }
}
## 🔑 Environment Variables
Name	Required	Description	Example
VITE_API_URL	✔	Base URL of the backend	http://localhost:4000

## 🛠️ How It Works
Authentication Flow (AuthContext)
Frontend calls /auth/login or /auth/register.

Backend returns JWT → stored in localStorage.

apiClient adds Authorization: Bearer <token> to every request.

AuthContext exposes login, register, logout, user, token, loading.

Private routes redirect unauthenticated users to /login.

API Client (src/utils/apiClient.js)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API request failed');
  return data;
}

export const apiClient = {
  get:    (e)    => request(e, { method: 'GET'    }),
  post:   (e, b) => request(e, { method: 'POST',   body: JSON.stringify(b) }),
  put:    (e, b) => request(e, { method: 'PUT',    body: JSON.stringify(b) }),
  delete: (e)    => request(e, { method: 'DELETE' }),
};
Custom Hooks
Hook	CRUD / Action Functions
useFoods	fetchFoods, createFood, updateFood, deleteFood
usePets	fetchPets, createPet, updatePet, deletePet
useNotifications	getLowStockAlerts(thresholdDays) → alerts, refresh

## 🖥️ Pages & Components
Login / Register → forms + redirect.

Dashboard → three cards: Pets, Food, Notifications.

Foods / Pets → responsive grids + CRUD forms.

Notifications → low-stock alerts list or banner.

NavBar → links + logout (hidden on /login & /register).

## 🌐 Deployment (Vercel)
Setting	Value
Project Root	frontend/
Build Command	npm install && npm run build
Output	dist
Env Vars	VITE_API_URL=https://petfeedingapp.onrender.com

Pushes to the main branch auto-deploy via Vercel.

## 🔄 Manual QA Checklist
Register & Login → redirect to /dashboard.

Dashboard → verify 3 cards with counters.

Foods

If none: Food.png illustration + “Add New Food”.

Full CRUD workflow in responsive grid.

Pets → same CRUD workflow.

Notifications → low-stock alerts displayed.

Responsiveness

< 600 px → 1 column.

≥ 600 px → 2 columns.

≥ 768 px → 3 columns.

Logout → token cleared, redirect to /login.

## 🧪 Tests
No automated tests yet.
Use the manual QA checklist to verify:

Authentication flows

Route protection

Foods/Pets CRUD operations

Responsive layout

Notification retrieval

## 📜 Additional Notes
Icons & Logos

public/favicon.ico

public/assets/images/logo.png

Default Tailwind breakpoints

sm: 640px, md: 768px, lg: 1024px, xl: 1280px

## 📡 Backend Endpoints

AUTH
POST /auth/register
POST /auth/login
GET  /auth/me                       (requires Bearer)

FOODS
GET    /api/foods
POST   /api/foods
GET    /api/foods/:id
PUT    /api/foods/:id
DELETE /api/foods/:id

PETS
GET    /api/pets
POST   /api/pets
GET    /api/pets/:id
PUT    /api/pets/:id
DELETE /api/pets/:id

NOTIFICATIONS
GET /api/notifications/low-stock?thresholdDays=<n>
☑️ Environment Tips
Ensure the backend is reachable at VITE_API_URL before starting the frontend.

After editing .env, restart npm run dev.
