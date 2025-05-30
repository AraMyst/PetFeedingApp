# Pet Feeding App – Backend

This is the README for the **backend** of the Pet Feeding App. It covers how to install, configure, run, test, and deploy the Node.js/Express API that powers the food & pet management functionality.

---

## ⚙️ Tech Stack

- **Node.js** v16+
- **Express** v4
- **MongoDB** (via Mongoose)
- **JWT** for authentication
- **Deployed on Render** (https://petfeedingapp.onrender.com)

---

## 📦 Installation

1. **Clone only the backend**  
   ```bash
   git clone https://github.com/AraMyst/PetFeedingApp/
   cd pet-feeding-app-backend
Install dependencies

bash
Copiar
Editar
npm install
Configure environment variables
Create a .env file in the project root with:

env
Copiar
Editar
PORT=4000
MONGODB_URI=<your-mongo-connection-string>
JWT_SECRET=<your-jwt-secret>
Make sure JWT_SECRET matches what you use in the deployed Render environment.

Run the server locally

bash
Copiar
Editar
npm run dev
The API will be available at http://localhost:4000.

🌐 Deployment
This service is deployed on Render as a Web Service.

URL: https://petfeedingapp.onrender.com

Branch: main

Root Directory: backend/ (if part of monorepo)

Build Command: npm install

Start Command: npm run start

On each push to main, Render auto-deploys the latest code. Changes normally go live within a couple of minutes.

🔑 Environment Variables (Render Dashboard)
In your Render service settings → Environment → “Add Environment Variable”:

Name	Value
MONGODB_URI	mongodb+srv://...
JWT_SECRET	your secret key
NODE_ENV	production
PORT	4000

🚀 API Reference
📋 Authentication
POST /api/auth/register
Create a new user.

json
Copiar
Editar
{
  "email": "user@example.com",
  "password": "strongPassword123"
}
POST /api/auth/login
Login and receive a JWT.

json
Copiar
Editar
{
  "email": "user@example.com",
  "password": "strongPassword123"
}
Response

json
Copiar
Editar
{ "token": "<JWT_TOKEN_HERE>" }
All subsequent endpoints require Authorization: Bearer <JWT_TOKEN> header.

🍽 Foods
GET /api/foods
List all foods.

GET /api/foods/:id
Get a single food by its ID.

POST /api/foods
Create a new food.

json
Copiar
Editar
{
  "name": "Super Food Deluxe",
  "brand": "TopPet",
  "specifications": ["grain-free","large"],
  "weight": 4000,
  "buyLinks": [  // formerly amazonLinks
    "https://www.petshopexample.com/produto/super-food-deluxe"
  ]
}
If buyLinks is omitted or empty, the server will auto-generate a search URL:

arduino
Copiar
Editar
https://www.amazon.co.uk/s?k=<URL_ENCODED_NAME>
PUT /api/foods/:id
Update an existing food (partial or full).

DELETE /api/foods/:id
Delete a food by ID.

🐾 Pets
GET /api/pets
List all pets.

GET /api/pets/:id
Retrieve one pet by ID.

POST /api/pets
Create a new pet.

json
Copiar
Editar
{
  "name": "Luna",
  "age": 2,
  "allergies": ["salmon"],
  "gramsPerMeal": 100,
  "mealsPerDay": 3,
  "food": "6839964e31da5aaf0104065a"  // _id from a Food document
}
PUT /api/pets/:id
Update an existing pet.

DELETE /api/pets/:id
Delete a pet.

✅ Testing
We use Insomnia (or Postman) to:

Authenticate → obtain a JWT.

Set Base Environment

baseUrl = https://petfeedingapp.onrender.com

token = <your JWT>

Attach Bearer Token to Auth tab on all requests.

Run through all CRUD flows for /foods and /pets.

🔄 Migrations & Data
No migrations are needed—Mongoose handles schema changes. If you change a schema, drop or migrate your collections manually.