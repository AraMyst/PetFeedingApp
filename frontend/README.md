Pet Feeding App – Frontend
This is the README for the frontend of the Pet Feeding App. It covers how to install, configure, run, and deploy the React/Vite application that provides the user interface for managing pets, foods, and low-stock notifications.

⚙️ Tech Stack
Framework: React v18+

Bundler/Dev Server: Vite v4+

Styling: Tailwind CSS v3

Routing: React Router v6

State Management / API Layer:

Custom React hooks (useAuth, useFoods, usePets, useNotifications)

fetch()-based HTTP client (apiClient.js)

Authentication: JWT stored in localStorage

Icons & Images: Static .png files under public/assets/images/

Deployment Platform: Vercel (https://vercel.com)

🏠 Project Structure
arduino
Copiar
Editar
frontend/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── Pets.png
│   │   │   ├── Food.png
│   │   │   ├── Notifications.png
│   │   │   └── logo.png
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── api/
│   │   └── auth.js
│   │   └── foods.js
│   │   └── pets.js
│   │   └── notifications.js
│   │
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   │
│   │   ├── Foods/
│   │   │   ├── FoodForm.jsx
│   │   │   ├── FoodItem.jsx
│   │   │   └── FoodList.jsx
│   │   │
│   │   ├── Pets/
│   │   │   ├── PetForm.jsx
│   │   │   ├── PetItem.jsx
│   │   │   └── PetList.jsx
│   │   │
│   │   ├── Notifications/
│   │   │   ├── NotificationBanner.jsx
│   │   │   └── NotificationList.jsx
│   │   │
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
📦 Installation
Clone the repository (frontend only):

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
This will install all required packages, including React, React Router, Tailwind CSS, and others.

Configure environment variables:

Create a .env file in the frontend/ directory with the following contents:

env
Copiar
Editar
VITE_API_URL=https://petfeedingapp.onrender.com
VITE_API_URL should point to your deployed backend URL (e.g., https://petfeedingapp.onrender.com).

If you run the backend locally on port 4000, you can set:

env
Copiar
Editar
VITE_API_URL=http://localhost:4000
🚀 Running the App Locally
Run the development server:

bash
Copiar
Editar
npm run dev
The Vite dev server will start, typically at http://localhost:5173/.

Open your browser at that URL to see the app.

Available Scripts (in package.json):

npm run dev
Starts Vite in development mode with hot module replacement (HMR).

npm run build
Generates a production build under dist/.

npm run preview
Serves the production build locally for testing (after npm run build).

🧰 Configuration & Tailwind Setup
Tailwind CSS is already configured via tailwind.config.js. By default, it uses the following breakpoints:

js
Copiar
Editar
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Customizing breakpoints (if needed) can be done inside the theme.extend.screens section, e.g.:

js
Copiar
Editar
theme: {
  extend: {
    screens: {
      sm: '500px',  // override small screen to 500px
      md: '600px',  // override medium screen to 600px
      lg: '1024px',
      xl: '1280px',
    }
  }
}
Global styles are defined in src/index.css:

css
Copiar
Editar
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global base styles */
@layer base {
  html {
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: #DBF3F6;
    min-height: 100vh;
  }
}
🔑 Environment Variables
In frontend/.env (Vite automatically picks up VITE_-prefixed variables):

env
Copiar
Editar
VITE_API_URL=https://petfeedingapp.onrender.com
VITE_API_URL (required)
The base URL for your backend API.

Example for local development: VITE_API_URL=http://localhost:4000

Example for production: VITE_API_URL=https://petfeedingapp.onrender.com

🛠️ How It Works
Authentication Flow (AuthContext):

On login/register, the frontend calls /auth/login or /auth/register on the backend.

The returned JWT is stored in localStorage under token.

The apiClient attaches Authorization: Bearer <token> header on all subsequent requests.

AuthContext provides login(), register(), logout(), user, token, and loading state via useAuth() hook.

Protected routes (Dashboard, Foods, Pets, Notifications) are guarded by PrivateRoute; unauthenticated users are redirected to /login.

API Client (src/utils/apiClient.js):

js
Copiar
Editar
// src/utils/apiClient.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'API request failed')
  }
  return data
}

export const apiClient = {
  get:    (endpoint)         => request(endpoint, { method: 'GET' }),
  post:   (endpoint, body)   => request(endpoint, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (endpoint, body)   => request(endpoint, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (endpoint)         => request(endpoint, { method: 'DELETE' }),
}
Custom Hooks (data + CRUD operations):

useFoods.js

fetchFoods(), createFood(data), updateFood(id, data), deleteFood(id)

Exposes { foods, loading, error, fetchFoods, createFood, updateFood, deleteFood }

usePets.js

fetchPets(), createPet(data), updatePet(id, data), deletePet(id)

Exposes { pets, loading, error, fetchPets, createPet, updatePet, deletePet }

useNotifications.js

getLowStockAlerts(thresholdDays) calls /api/notifications/low-stock?thresholdDays=X

Exposes { alerts, loading, error, refreshAlerts }

These hooks automatically fetch data on mount (useEffect) and handle loading/error states.

Pages & Components:

LoginPage.jsx / RegisterPage.jsx

Contain forms (LoginForm.jsx / RegisterForm.jsx), call useAuth().login() or .register(), handle errors, redirect to /dashboard upon success.

Hide NavBar if user is on /login or /register.

DashboardPage.jsx

Displays three cards: Pets, Food, Notifications.

Each card shows a small icon/illustration, item count, and a “Manage …” button linking to the respective page.

Background color set to #DBF3F6.

Uses a responsive grid/flex container.

Logo and project name appear at the top.

FoodsPage.jsx

Fixed header with logo.

“Add New Food” button below header.

When no foods exist, shows a large Food.png illustration + “Add New Food” button.

When foods exist, displays FoodList.jsx (responsive grid).

Contains FoodForm.jsx to add/edit; toggles between list and form via local state.

FoodList.jsx & FoodItem.jsx

FoodList renders a responsive grid (grid-cols-1 sm:grid-cols-2 md:grid-cols-3).

FoodItem displays each food’s details (name, brand, weight, specs, buyLinks) and two buttons: “Edit” / “Delete”.

PetsPage.jsx (similar structure to FoodsPage, but for pets).

NotificationsPage.jsx (lists low-stock alerts and/or detailed notifications).

NavBar.jsx

Persistent top bar (hidden on /login & /register) with links to: Dashboard, Foods, Pets, Notifications, and a “Logout” button.

Highlights active link and handles logout() from AuthContext.

🌐 Deployment
This frontend is configured for Vercel. On each push to the main branch, Vercel will:

Detect the Vite project.

Install dependencies (npm install).

Run the build command (npm run build).

Deploy the contents of the dist/ folder to a production URL.

Vercel Settings
Project Root: frontend/

Build Command: npm install && npm run build

Output Directory: dist

Environment Variables (in Vercel Dashboard → Settings → Environment Variables):

VITE_API_URL = https://petfeedingapp.onrender.com
(or your custom backend URL)

🔄 How to Test / QA
Step 1 – Register & Login

Visit /register → create a new user (email + password).

On success, you should be redirected to /dashboard.

If you refresh /dashboard (and token remains in localStorage), you stay logged in.

Step 2 – Dashboard

Verify 3 cards (Pets, Food, Notifications).

Counts should default to 0.

Click “Manage Pets” → redirects to /pets.

Click “Manage Foods” → redirects to /foods.

Click “Manage Notifications” → redirects to /notifications.

Step 3 – Foods Section

If no food exists:

You should see a large Food.png illustration centered.

Below it, a button “Add New Food.”

Click “Add New Food” → form appears (fields: name, brand, weight, specifications, buyLinks).

Submit the form → should create a new food via API, close form, and display it in a grid.

Each food card:

Shows name, brand, weight (g), specifications (comma-separated), and “Buy” links (if provided).

Two buttons: “Edit” opens the form pre-filled; “Delete” asks for confirmation before removal.

Step 4 – Pets Section

Navigate to /pets (similar UI pattern as Foods).

If no pets exist: shows Pets.png illustration + “Add New Pet” button.

You can add, edit, or remove pets.

Step 5 – Notifications Section

Navigate to /notifications.

The page should fetch low-stock alerts and display them in a list or banner.

Optionally, provide ways to mark as “Resolved” or navigate to the associated food/pet.

Step 6 – Responsive Behavior

Shrink the browser width under 600px → confirm that food/pet cards stack vertically (1 column).

At widths ≥ 600px (md), confirm the cards appear side by side in a 3-column layout.

At widths ≥ 500px but < 600px (sm), confirm a 2-column layout (for FoodList/PetList).

Step 7 – Logout

Click “Logout” in the NavBar → token should be removed, and you should be redirected to /login.

🧪 Testing
Currently, no automated tests are included. Manual testing steps (as above) can be used to verify:

Authentication flows (register → login → token persistence).

Protected route behavior (redirects if token is missing/invalid).

CRUD operations on foods and pets via UI.

Responsive layout checks at different breakpoints.

Notification fetching and display.

📜 Additional Notes
Favicon & Logo:

public/favicon.ico is used in the <head> of index.html.

public/assets/images/logo.png is displayed in NavBar and pages like Dashboard & FoodsPage.

Tailwind Breakpoints (Default):

sm: 640px

md: 768px

lg: 1024px

xl: 1280px

These can be overridden in tailwind.config.js under theme.extend.screens if you need custom breakpoints (e.g., making md = 600px).

API Endpoints:

Frontend expects the following backend routes (relative to VITE_API_URL):

/auth/register (POST)

/auth/login (POST)

/auth/me (GET, requires Authorization header)

/api/foods + /api/foods/:id (GET, POST, PUT, DELETE)

/api/pets + /api/pets/:id (GET, POST, PUT, DELETE)

/api/notifications/low-stock?thresholdDays=<number> (GET)

Environment Management:

Ensure the backend is running and accessible at the URL configured in VITE_API_URL before testing the frontend.

After updating VITE_API_URL, you must restart the dev server (npm run dev) for changes to take effect.
