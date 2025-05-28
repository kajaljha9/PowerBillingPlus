# Power Billing Plus – Backend

This is the backend API server for **Power Billing Plus**, a role-based electricity billing system. Built using **Node.js**, **Express.js**, and **MongoDB**, it supports CRUD operations for users and bills, JWT-based authentication, and RESTful APIs.

---

## 📦 Features

- Admin authentication (Signup/Login)
- Role-based access control (Admin vs User)
- CRUD operations for:
  - Users
  - Bills
- Slab-based billing calculation
- Bill payment processing with simulated transactions
- Dashboard analytics (total revenue, usage stats)

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **bcrypt** for password hashing
- **jsonwebtoken (JWT)** for authentication
- **dotenv** for environment config
- **cors**, **helmet**, and **morgan** for security/logging

---

## 📂 Project Structure
backend/
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── userController.js
│ └── billController.js
├── middleware/
│ ├── authToken.js
│ └── adminOnly.js
├── models/
│ ├── Admin.js
│ ├── User.js
│ └── Bill.js
├── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
│ └── billRoutes.js
├── utils/
│ └── calculateAmount.js
├── .env
├── server.js
└── package.json



---

## ⚙️ Setup Instructions

1. Clone the repository and navigate to `backend/`:
   ```bash
   git clone <repo-url>
   cd backend
2. Install dependencies:
   npm install

3. Configure .env:
   PORT=5000
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/power-billing
   JWT_SECRET=your_jwt_secret

4. Run server:
   npm start

5. Server will be live at:
    http://localhost:5000/api