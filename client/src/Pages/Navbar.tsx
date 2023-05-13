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
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import logo from "../assets/logo-on-green.png";
import ImageListItem from "@mui/material/ImageListItem";
import { justify } from "@cloudinary/url-gen/qualifiers/textAlignment";

function NavBar() {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    console.log("this is the state variable for current user", currentUser);
    getProfileLink(currentUser);
  }, [currentUser]);

  const [profileLink, setProfileLink] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setProfileLink(getProfileLink(currentUser));
    }
  }, [currentUser]);

  const getProfileLink = (currentUser) => {
    if (currentUser.role === "recruiter") {
      return `/recruiter/${currentUser.id}`;
    } else if (currentUser.role === "applicant") {
      return `/applicant/${currentUser.id}`;
    } else {
      return null;
    }
  };

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
              justifyContent: "space-between",
            }}
            sx={{
              "@media (max-width: 400px)": {
                flexDirection: "column",
              },
            }}
          >
            <div>
              <ListItem key={"Logo"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={logo}
                      alt="logo"
                      style={{ width: 170, height: 60 }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ListItem key={"Dashboard"} disablePadding>
                <Link to="/dashboard" className="link">
                  <ListItemButton
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ListItemIcon>
                      <InsightsIcon
                        style={{ color: "white", width: 30, height: 30 }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem key={"Your Profile"} disablePadding>
                <Link to={profileLink} className="link">
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon
                        style={{ color: "white", width: 30, height: 30 }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem key={"Settings"} disablePadding>
                <Link to="/settings" className="link">
                  <ListItemButton>
                    <ListItemIcon>
                      <SettingsIcon
                        style={{ color: "white", width: 30, height: 30 }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem key={"Logout"} disablePadding>
                <Link to="/" className="link">
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon
                        style={{ color: "white", width: 30, height: 30 }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
              </ListItem>
            </div>
          </List>
        </nav>
        <Outlet />
      </AppBar>
    </>
  );
}

export default NavBar;
