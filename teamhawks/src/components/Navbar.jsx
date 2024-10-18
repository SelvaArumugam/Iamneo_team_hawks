import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function ButtonAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens)
    navigate("/"); // Navigate to the home page
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#6a1b9a", // Purple background
          height: "90px", // Increased height for the Navbar
        }}
      >
        <br></br>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center", // Centers elements horizontally
            alignItems: "center", // Centers elements vertically
          }}
        >
          {/* Menu Icon that triggers the Drawer */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, fontSize: "2rem" }}
            onClick={toggleDrawer(true)} // Open drawer on click
          >
            <MenuIcon sx={{ fontSize: "2.5rem" }} />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#ffffff", fontSize: "2rem", textAlign: "center" }}
          >
            Team Hawks
          </Typography>

          {/* Login and Signup Buttons */}
          <Box sx={{ marginLeft: "auto" }}>
            <Button
              color="inherit"
              sx={{ color: "#ffffff", fontSize: "1.2rem", marginRight: 2 }}
              onClick={handleLogout} // Call handleLogout on click
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer that opens vertically below the AppBar */}
      <Drawer
        anchor="left" // Opens from the left
        open={drawerOpen}
        onClose={toggleDrawer(false)} // Closes the drawer
        sx={{
          "& .MuiDrawer-paper": {
            height: "100vh", // Full height of the viewport
            marginTop: "90px", // Ensure it opens below the AppBar
            width: "250px", // Width of the drawer
          },
        }}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)} // Close drawer on click
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {/* Drawer items */}
            {["Dashboard", "Profile", "Vendors List", "Help"].map(
              (text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}
