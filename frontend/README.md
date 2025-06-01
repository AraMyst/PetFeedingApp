<div markdown="1">

# Pet Feeding App – Frontend

This is the README for the **Pet Feeding App** frontend.  
It explains how to **install, configure, run, and deploy** the React / Vite application that provides the UI for managing pets, foods, and low-stock notifications.

**Live demo:** <https://petfeedingapp.vercel.app>

---

## ⚙️ Tech Stack

- **Framework:** React 18 +
- **Bundler / Dev Server:** Vite 4 +
- **Styling:** Tailwind CSS 3
- **Routing:** React Router 6
- **State & API**
  - Custom hooks: `useAuth`, `useFoods`, `usePets`, `useNotifications`
  - `fetch`-based HTTP client: `apiClient.js`
- **Authentication:** JWT stored in `localStorage`
- **Assets:** `.png` images in `public/assets/images/`
- **Hosting / CI:** Vercel

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
│   ├── api/                ← tiny wrappers for apiClient
│   ├── components/         ← UI building blocks
│   ├── contexts/           ← React Contexts
│   ├── hooks/              ← data-fetch / auth hooks
│   ├── pages/              ← route-level views
│   ├── utils/              ← apiClient.js
│   ├── index.css
│   ├── main.jsx
│   └── App.jsx
│
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── vite.config.js
📦 Installation
Clone just the frontend:

bash
Copiar
Editar
git clone https://github.com/AraMyst/PetFeedingApp.git
cd PetFeedingApp/frontend
Install dependencies:

bash
Copiar
Editar
npm install
Environment variables:

Create a .env file in frontend/:

env
Copiar
Editar
VITE_API_URL=https://petfeedingapp.onrender.com
For a locally running backend (port 4000):

env
Copiar
Editar
VITE_API_URL=http://localhost:4000
🚀 Running Locally
bash
Copiar
Editar
npm run dev
The Vite dev-server usually starts at http://localhost:5173/.

📜 Available Scripts
Script	Purpose
npm run dev	Vite dev-server with HMR
npm run build	Production build to dist/
npm run preview	Serves the build locally (after npm run build)

🧰 Tailwind Setup
js
Copiar
Editar
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
}
To override breakpoints:

js
Copiar
Editar
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

css
Copiar
Editar
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Helvetica, Arial, sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: #dbf3f6;
    min-height: 100vh;
  }
}
🔑 Environment Variables
Name	Required	Description	Example
VITE_API_URL	✅	Base URL of the backend	http://localhost:4000

🛠️ How It Works
Authentication Flow (AuthContext)
Frontend hits /auth/login or /auth/register.

JWT is saved in localStorage under token.

apiClient attaches Authorization: Bearer <token> to every request.

AuthContext exposes login, register, logout, user, token, loading.

Protected routes redirect unauthenticated users to /login.

API Client (src/utils/apiClient.js)
js
Copiar
Editar
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
  get:    (e)      => request(e, { method: 'GET' }),
  post:   (e, b)   => request(e, { method: 'POST', body: JSON.stringify(b) }),
  put:    (e, b)   => request(e, { method: 'PUT',  body: JSON.stringify(b) }),
  delete: (e)      => request(e, { method: 'DELETE' }),
};
Custom Hooks
Hook	CRUD / Functionality
useFoods	fetchFoods, createFood, updateFood, deleteFood
usePets	fetchPets, createPet, updatePet, deletePet
useNotifications	getLowStockAlerts(thresholdDays) → alerts, refresh

🖥️ Pages & Components
Login / Register → forms + redirects

Dashboard → 3 cards: Pets, Food, Notifications

Foods / Pets → responsive grid + CRUD forms

Notifications → low-stock alerts

NavBar → route links + Logout (hidden on /login, /register)

🌐 Deployment (Vercel)
Setting	Value
Project root	frontend/
Build command	npm install && npm run build
Output dir	dist
Env vars	VITE_API_URL=https://petfeedingapp.onrender.com

A push to the main branch triggers install → build → deploy.

🔄 Manual QA Checklist
Register + Login → redirect to /dashboard.

Dashboard → 3 cards with counters.

Foods

Empty state shows Food.png + “Add New Food”.

Full CRUD flow in responsive grid.

Pets → same pattern as Foods.

Notifications → list / banner of low-stock alerts.

Responsive

< 600 px: 1-column cards

≥ 600 px: 2-column

≥ 768 px: 3-column

Logout → removes token, redirects to /login.

🧪 Testing
Automatic tests are not included yet.
Use the QA checklist above to validate:

Auth flows

Protected routes

CRUD for foods/pets

Responsive layouts

Low-stock alerts

📜 Additional Notes
Favicon & Logo

public/favicon.ico

public/assets/images/logo.png

Tailwind breakpoints (default)
sm: 640px, md: 768px, lg: 1024px, xl: 1280px
Override in tailwind.config.js → theme.extend.screens.

📡 Expected Backend Endpoints
Base URL = VITE_API_URL

bash
Copiar
Editar
AUTH
POST /auth/register
POST /auth/login
GET  /auth/me                       (requires Bearer token)

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
Ensure the backend is reachable at VITE_API_URL before testing.

After changing .env, restart the dev server: npm run dev.

</div> ```
