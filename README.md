# README.md for both Frontend and backend


# Power Billing Plus – Frontend

This is the frontend of **Power Billing Plus**, a full-stack electricity billing and payment system. It is built using **React.js** and styled with **Material UI (MUI)**. The frontend supports two user roles — **Admin** and **User**, each with their own dashboard and permissions.

---

## 🚀 Features

- Admin Dashboard:
  - Login & authentication
  - Add/Edit/Delete Users
  - Generate and manage electricity bills
  - Visualize usage & revenue reports using charts

- User Dashboard:
  - Login (credentials created by admin)
  - View pending & paid bills
  - Pay bills (mock payment flow)
  - View profile

- Fully responsive design (desktop/tablet/mobile)

---

## 🛠️ Tech Stack

- **React.js**
- **React Router DOM**
- **Material UI (MUI)**
- **Axios** (API communication)
- **JWT** for route protection
- **Recharts** for admin analytics

---

## 📦 Project Structure

frontend/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── routes/
│ ├── utils/
│ ├── App.js
│ └── index.js
└── package.json


---

## 📂 Setup Instructions

1. Clone the repository and navigate to `frontend/`:
   ```bash
   git clone <repo-url>
   cd frontend

2. Install dependencies:
  npm install
3. Configure the environment:
   Create a .env file with:
   REACT_APP_API_BASE_URL=
   http://localhost:5000/api

4. Run the app:
   npm start

5. Access at:http://localhost:3000/
   


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
