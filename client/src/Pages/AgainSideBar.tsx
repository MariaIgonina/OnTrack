import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Navbar from "./Navbar";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import InsightsIcon from "@mui/icons-material/Insights";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, Link } from "react-router-dom";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: "100%", backgroundColor: "#568ea3" }}
      >
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <Navbar />
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem key={"Dashboard"} disablePadding>
            <Link to="/dashboard" className="link">
              <ListItemButton>
                <ListItemIcon>
                  <InsightsIcon />
                </ListItemIcon>
                <ListItemText primary={"Your Dashboard"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem key={"Your Profile"} disablePadding>
            <Link to="/recruiterProfile" className="link">
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Your Profile"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <Divider />
          <ListItem key={"Settings"} disablePadding>
            <Link to="/settings" className="link">
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Settings"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key={"Logout"} disablePadding>
            <Link to="/" className="link">
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
