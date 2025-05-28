import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import adminBackground from "../../assets/bulbCalculater.jpg";

const AdminLayout = ({ children }) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      <AdminNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((prev) => !prev)}
      />

      <main
        style={{
          marginLeft: !isMobile && isSidebarOpen ? 220 : 0,
          padding: "20px",
          width: "100%",
          height: "100vh",
          overflowY: "auto",
          transition: "margin-left 0.3s ease",
          paddingTop: isMobile ? "80px" : "20px", // <-- this line ensures content doesn't go under mobile navbar
          backgroundImage: `url(${adminBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
