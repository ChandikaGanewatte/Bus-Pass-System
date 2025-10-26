import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const MenuBarAdmin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // <960px

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems_1 = [
    { text: "Home", path: "/admin" },
    { text: "Issued Passes", path: "/admin/issued_passes" },
    { text: "Pending Passes", path: "/admin/pending_passes" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth); // sign out the user
      navigate("/login"); // redirect to login
      console.log("logout");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          transition: "all 0.3s ease",
          height: scrolled ? 70 : 110,
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            transition: "all 0.3s ease",
          }}
        >
          {/* Logo + Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
            }}
            onClick={() => navigate("/admin")}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: scrolled ? 40 : 50,
                height: scrolled ? 40 : 50,
                transition: "all 0.3s ease",
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, transition: "all 0.3s ease" }}
            >
              Bus Pass System
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "center",
                gap: 2,
              }}
            >
              {menuItems_1.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive ? "primary" : "inherit",
                      borderRadius: 2,
                      background: isActive ? "white" : "none",
                    }}
                  >
                    {item.text}
                  </Button>
                );
              })}
            </Box>
          )}

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                color="inherit"
                onClick={() => navigate("/admin/profile")}
              >
                <Avatar alt="Profile" src="/static/images/avatar/1.jpg" />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem onClick={() => navigate("/admin/profile")}>
              <Avatar alt="Profile" src="/static/images/avatar/1.jpg" />
            </ListItem>
            {menuItems_1.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* Add spacing so content is not hidden under AppBar */}
      <Toolbar sx={{ height: scrolled ? 70 : 110 }} />
    </>
  );
};

export default MenuBarAdmin;
