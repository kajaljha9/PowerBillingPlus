//src/ api/apiService.js
import axios from "axios";


const API = axios.create({ baseURL: "http://localhost:5050/api" });

// Admin SignUp
export const registerAdmin = (adminData) =>
  API.post("/admin/signup", adminData);

// Admin Login
export const loginAdmin = (adminData) => API.post("/admin/login", adminData);

// User Management
export const addUser = (data) => API.post("/users", data);
export const getAllUsers = () => API.get("/users");
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const getUserById = (id) => API.get(`/users/${id}`);

// bill management
export const generateBill = (data) => API.post("/bills", data);
export const getAllBills = (params) => API.get("/bills", { params });
export const updateBillStatus = (id, data) => API.put(`/bills/${id}`, data);
export const deleteBill = (id) => API.delete(`/bills/${id}`);
export const updateBill = (id, data) => API.put(`/bills/${id}`, data);

// admin dashboard
export const getDashboardMetrics = (filters) =>
  API.get("/dashboard/metrics", { params: filters });
export const getRevenueData = (filters) =>
  API.get("/dashboard/revenue", { params: filters });
export const getUserPaymentStatusData = (filters) =>
  API.get("/dashboard/user-payment-status", { params: filters });
export const getUnitsComparisonData = (filters) =>
  API.get("/dashboard/units-comparison", { params: filters });

//user
export const userLogin = (data) => API.post(`/users/login`, data);
export const getUnpaidBills = (userId) =>
  API.get(`/users/bills/unpaid/${userId}`);
export const getPaidBills = (userId) => API.get(`/users/bills/paid/${userId}`);
export const payBill = (billId) => API.post(`/users/pay/${billId}`);
