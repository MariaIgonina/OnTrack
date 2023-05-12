import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Outlet, Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import InsightsIcon from "@mui/icons-material/Insights";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";

function NavBar() {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ width: "100%", backgroundColor: "#568ea3" }}
      >
        <nav>
          <List
            style={{
              display: "flex",
              flexDirection: "row",
            }}
            sx={{
              "@media (max-width: 400px)": {
                flexDirection: "column",
              },
            }}
          >
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
        </nav>
        <Outlet />
      </AppBar>
    </>
  );
}

export default NavBar;
