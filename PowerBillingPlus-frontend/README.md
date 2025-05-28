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
   
