// src/components/admin/AdminNavbar.jsx
import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Home,
  Person,
  ReceiptLong,
  AccountBox,
  Logout,
  ElectricBolt
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = ({ onSidebarToggle, isSidebarOpen }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: <Home />, path: "/dashboard" },
    { label: "Manage Users", icon: <Person />, path: "/manageuser" },
    { label: "Manage Bills", icon: <ReceiptLong />, path: "/managebill" },
    { label: "Admin Profile", icon: <AccountBox />, path: "/adminprofile" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("selectedUser");
    localStorage.removeItem("loginCred");
    navigate("/");
  };

  const renderNavItems = (collapsed) => (
    <List>
      {navItems.map((item) => (
        <Tooltip
          title={collapsed ? item.label : ""}
          placement="right"
          key={item.label}
        >
          <ListItem
            button
            component={Link}
            to={item.path}
            className="nav-item"
            sx={{ justifyContent: collapsed ? "center" : "flex-start" }}
          >
            <ListItemIcon className="nav-icon">{item.icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={item.label} />}
          </ListItem>
        </Tooltip>
      ))}
      <Tooltip title={collapsed ? "Logout" : ""} placement="right">
        <ListItem
          button
          onClick={handleLogout}
          className="nav-item logout"
          sx={{ justifyContent: collapsed ? "center" : "flex-start" }}
        >
          <ListItemIcon className="nav-icon logout-icon">
            <Logout />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Logout" />}
        </ListItem>
      </Tooltip>
    </List>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Box className="mobile-nav">
            <Box className="nav-title">
              <ElectricBolt className="bolt" />
              <Typography variant="h6">Power Billing Plus</Typography>
            </Box>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box className="drawer">{renderNavItems(false)}</Box>
          </Drawer>
        </>
      ) : (
        <Box className={`sidebar ${isSidebarOpen ? "expanded" : "collapsed"}`}>
          <Box className="sidebar-header" sx={{ marginTop: "10px" }}>
            {isSidebarOpen && (
              <Box className="nav-title">
                <ElectricBolt className="bolt" />
                <Typography sx={{ fontSize: "14px" }}>
                  <b>Power Billing Plus</b>
                </Typography>
              </Box>
            )}
            <IconButton onClick={onSidebarToggle} sx={{ width: "auto" }}>
              <MenuIcon />
            </IconButton>
          </Box>
          <br />
          <hr />
          <br />
          {renderNavItems(!isSidebarOpen)}
        </Box>
      )}
    </>
  );
};

export default AdminNavbar;
