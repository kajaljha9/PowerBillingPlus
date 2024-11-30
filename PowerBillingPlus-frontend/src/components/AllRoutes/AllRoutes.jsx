import { Route, Routes } from "react-router-dom";
import LandingPage from "../user/LandingPage";
import ForgotPassword from "../user/ForgotPassword";
import LoginPage from "../user/LoginPage";
import ViewBill from "../user/ViewBill";
import OldBills from "../user/OldBills";
import Payment from "../user/Payment";
import Profile from "../user/Profile";
import SignUp from "../admin/SignUp";
import AdminLogin from "../admin/AdminLogin";
import AdminProfile from "../admin/AdminProfile";
import GenerateBill from "../admin/GenerateBill";
import AddUser from "../admin/AddUser";
import ManageUser from "../admin/ManageUser";
import Dashboard from "../admin/Dashboard/Dashboard";
import Reports from "../admin/Reports/Reports";
import Bill from "../admin/Bill";
import MakePayment from "../user/MakePayment";
import ManageBill from "../admin/ManageBill";
import ProtectedRoute from "../ProtectedRoute ";
 // Import ProtectedRoute

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route
          path="/viewbill"
          element={
            <ProtectedRoute>
              <ViewBill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <OldBills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/makepayment"
          element={
            <ProtectedRoute>
              <MakePayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manageuser"
          element={
            <ProtectedRoute>
              <ManageUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adduser"
          element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adduser/:id"
          element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/managebill"
          element={
            <ProtectedRoute>
              <ManageBill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generatebill"
          element={
            <ProtectedRoute>
              <GenerateBill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bill"
          element={
            <ProtectedRoute>
              <Bill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminprofile"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
