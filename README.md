# 🐾 Pet Feeding App – Full-Stack Monorepo  
A playful yet pragmatic application that helps pet owners keep track of foods, pets, and those all-important _low-stock_ alerts.  
Built as a **React + Vite** frontend talking to a **Node + Express + MongoDB** API, the project lives in a single GitHub repository with two sibling folders:

pet-feeding-app/
├── frontend/ # React client
└── backend/ # Express REST API

yaml
Copiar
Editar

> **Live demo:** <https://petfeedingapp.vercel.app> (frontend)  
> **Public API:** <https://petfeedingapp.onrender.com> (backend)

---

## ⚙️ Tech Stack at a Glance
| Layer        | Choice / Version | Notes |
|--------------|------------------|-------|
| **Frontend** | React 18, Vite 4 | Tailwind CSS 3, React Router 6, custom hooks |
| **Backend**  | Node 16+, Express 4 | Mongoose ODM, JWT auth |
| **Database** | MongoDB Atlas | free tier |
| **Auth**     | JSON Web Tokens  | stored in `localStorage` |
| **Hosting**  | Vercel (FE), Render (BE) | auto-deploy from `main` |

---

## 🏠 Repository Layout

pet-feeding-app/
│
├── frontend/ React + Vite client
│ ├── public/ static assets & HTML
│ ├── src/ components, hooks, pages, API client
│ └── ... config files (Tailwind, Vite, …)
│
└── backend/ Node + Express API
├── src/ routes, controllers, models
├── tests/ manual/Insomnia collection
└── ... config, env, scripts

yaml
Copiar
Editar

Each folder is completely standalone—you can spin them up together or individually.

---

## 🚀 Quick Start

### 1. Clone & scaffold

```bash
git clone https://github.com/AraMyst/PetFeedingApp.git
cd PetFeedingApp
2. Environment variables
Create two separate files:

frontend/.env

bash
Copiar
Editar
VITE_API_URL=http://localhost:4000
backend/.env

bash
Copiar
Editar
PORT=4000
MONGODB_URI=mongodb://localhost:27017/petfeeding
JWT_SECRET=choose-a-long-random-string
On production, the backend runs at https://petfeedingapp.onrender.com.
Reflect that URL in VITE_API_URL when you deploy the frontend.

3. Install dependencies
bash
Copiar
Editar
npm install --prefix frontend
npm install --prefix backend
4. Run locally (two terminals)
bash
Copiar
Editar
# Terminal A – API
cd backend
npm run dev            # nodemon, http://localhost:4000

# Terminal B – Web client
cd frontend
npm run dev            # Vite, http://localhost:5173
Prefer a single command?
Add concurrently to the repo root and script away in package.json.

🔑 Core Environment Vars
Name	Location	Required	Description
PORT	backend	✔︎	Port the API listens on
MONGODB_URI	backend	✔︎	Mongo connection string
JWT_SECRET	backend	✔︎	Used to sign/verify JWTs
VITE_API_URL	frontend	✔︎	Base URL of the backend

🛣️ API Cheat Sheet
All routes are prefixed with /api, and—except POST /auth/*—require the Authorization: Bearer <token> header.

Authentication
Verb	Route	Purpose
POST	/auth/register	Create account
POST	/auth/login	Obtain JWT

Foods
| GET/POST/PUT/DELETE | /foods & /foods/:id |

Pets
| GET/POST/PUT/DELETE | /pets & /pets/:id |

Notifications
| GET | /notifications/low-stock?thresholdDays=<n> |

For detailed payload examples, peek into backend/README.md or import the included Insomnia collection.

🧰 Frontend Highlights
AuthContext – centralizes login, logout, and user state.

Custom hooks – useFoods, usePets, useNotifications keep components lean.

Responsive UI – Tailwind grid adapts (1 → 2 → 3 columns) as screens widen.

Low-stock alerts – banner + list view, refreshed via thresholdDays.

🌐 Deployment Notes
Target	Service	Settings
Frontend	Vercel	Root = /frontend, Build = npm run build, Output = dist
Backend	Render	Root = /backend, Build = npm install, Start = npm start

Push to main → Render/Vercel rebuild automatically.
Changes usually surface in under two minutes.

🔄 Manual QA Checklist
Auth flow – Register, login, logout, route guard.

Dashboard – Cards show live counts.

Foods / Pets – Full CRUD, responsive grid.

Notifications – Low-stock list accurate after edits.

Breakpoints –

<600 px → 1 col

≥600 px → 2 cols

≥768 px → 3 cols

Automated tests are on the roadmap; meanwhile, this list keeps regressions at bay.
