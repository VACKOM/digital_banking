# 💳 Digital Banking API

A secure RESTful backend API built with **Node.js, Express, and MongoDB** to simulate core digital banking operations including authentication, account management, and financial transactions.

---

## 🚀 TL;DR

- **Tech Stack:** Node.js, Express, MongoDB
- **Authentication:** JWT (Bearer Token)
- **Live API:** https://your-render-link.onrender.com
- **Base URL (Local):** http://localhost:5000

---

## ✨ Features

- Secure password hashing with **bcrypt**
- JWT-based authentication
- Role-based access control
- Auto-generated bank account numbers
- Secure fund transfers between accounts
- Automatic debit and credit logic
- Middleware-based route protection
- MongoDB integration via Mongoose ODM

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv

---

## 📁 Project Structure

├── controllers/ # Route logic
├── models/ # Mongoose schemas
├── routes/ # Express route definitions
├── middleware/ # Authentication middleware
├── server.js # Entry point
├── postman_collection.json
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/VACKOM/digital_banking.git
cd digital_banking

```

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

▶️ Run the Application

- Development
  npm run dev
- Production
  npm start

  Server runs on:

- https://digital-banking-api.onrender.com
- http://localhost:5000

🔐 Authentication
Protected routes require:
Authorization: Bearer <token>
The JWT token is returned upon successful login.

📌 API Endpoints
🔐 Authentication
Method - Endpoint - Description
POST - /api/auth/register - Register a new user
POST - /api/auth/login - Login user

💼 Accounts
Method - Endpoint - Description
POST - /api/account - Create bank account
GET - /api/account - Get user accounts

💸 Transactions
Method - Endpoint - Description
POST - /api/transaction - Create transaction
GET - /api/transaction - List user transactions

🧪 Sample Request

- Register User
  POST /api/auth/register
  {
  "fullName": "Vida Ackom",
  "email": "vida@example.com",
  "phone": "0241234599",
  "role": "user",
  "password": "12345678"
  }

- Create Transaction
  POST /api/transaction
  {
  "type": "transfer",
  "amount": 500,
  "currency": "GHS",
  "description": "Sending to mom",
  "senderAccount": "account_id",
  "receiverAccount": "account_id"
  }
  ✔ Automatically debits sender and credits receiver.

📬 API Documentation (Postman)
A Postman collection is included for easy testing.

- Import Steps

1. Download postman_collection.json
2. Open Postman → Import
3. Select the file
4. Update the collection variable baseUrl:
   - Local: http://localhost:5000
   - Production: https://digital-banking-api.onrender.com

Authentication in Postman

1. Run Login
2. The JWT token is saved automatically to {{token}}
3. Protected requests use:Authorization: Bearer {{token}}

🔒 Security

- Password hashing with bcrypt
- JWT verification middleware
- Protected route enforcement
- Environment variables secured via .env
- .env excluded via .gitignore

  📜 License
  MIT License

  👤 Author
  Vida Anima Ackom
  Backend Developer (Node.js)
  Ghana 🇬🇭
  GitHub: https://github.com/VACKOM
