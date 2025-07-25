# 💳 Banking API

A secure RESTful API built with Node.js, Express, and MongoDB to handle:

- User registration and login
- Bank account creation
- Transactions (transfer, payment, deposit, withdrawal)
- JWT authentication

---

## 🚀 Features

- ✅ Secure password hashing with bcrypt
- ✅ User authentication with JWT
- ✅ Account creation with auto-generated account numbers
- ✅ Transactions between accounts
- ✅ Middleware-based token verification
- ✅ MongoDB via Mongoose ODM

---

## 📁 Project Structure

├── controllers/ # Route logic (users, accounts, transactions)
├── models/ # Mongoose models
├── routes/ # Express route definitions
├── middleware/ # Authentication middleware
├── server.js # Entry point
├── .env # Environment variables (not committed)
└── README.md # Documentation


---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/banking-api.git
cd banking-api

### 2. Install dependencies
npm install

### 3. Create .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/bankingdb
JWT_SECRET=your_jwt_secret_key

### 4. Run the server
npm run dev
The server runs on:
http://localhost:5000

🧪 API Endpoints
🔐 Auth Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a user
POST	/api/auth/login	Login and get token

🔐 Register
json
Copy
Edit
POST /api/auth/register
{
  "fullName": "Vida Ackom",
  "email": "vida@example.com",
  "phone": "0241234567",
  "role": "customer",
  "password": "12345678"
}
🔐 Login
json
Copy
Edit
POST /api/auth/login
{
  "email": "vida@example.com",
  "password": "12345678"
}
Response includes a JWT token in cookies or headers.

💼 Account Endpoints
Method	Endpoint	Description
POST	/api/accounts	Create bank account
GET	/api/accounts	Get user accounts

🏦 Create Account
json
Copy
Edit
POST /api/accounts
Headers: Authorization: Bearer <token>
{
  "accountType": "savings",
  "balance": 1000,
  "status": "active"
}
✅ The accountNumber is auto-generated.

💸 Transaction Endpoints
Method	Endpoint	Description
POST	/api/transactions	Create a transaction
GET	/api/transactions	List user transactions

💰 Create Transaction
json
Copy
Edit
POST /api/transactions
Headers: Authorization: Bearer <token>
{
  "type": "transfer",
  "amount": 500,
  "currency": "GHS",
  "description": "Sending to mom",
  "senderAccount": "64f72bd2781d7b2856b398d7",
  "receiverAccount": "64f72bd2781d7b2856b398a1"
}
✅ Automatically debits sender and credits receiver.

🔐 JWT Authentication
Middleware: auth.js

js
Copy
Edit
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

export default auth;
📦 Sample .env
env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/bankingdb
JWT_SECRET=your_jwt_secret
✅ .gitignore
gitignore
Copy
Edit
node_modules
.env
*.log
👩‍💻 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📜 License
This project is licensed under the MIT License

📝 Author
Vida Ackom
Ghana | 🇬🇭

