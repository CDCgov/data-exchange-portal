import {
  MenuItemType,
  PopupMenuItemType,
} from "@us-gov-cdc/cdc-react/dist/@types";

import styles from "./styles/Dashboard.module.css";

import dexLogo from "./assets/dex_logo.svg";

import {
  Button,
  ProfileHeader,
  ProfileHeaderLogo,
  Sidebar,
} from "@us-gov-cdc/cdc-react";

import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileHeaderPopupOpen, setProfileHeaderPopupOpen] = useState(false);

  if (!auth.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const logo = <ProfileHeaderLogo image={dexLogo} classNames={["dex-logo"]} />;

  // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
  const menuItems: MenuItemType[] = [
    {
      badgeCount: 5,
      icon: "notifications",
      className: "hide-on-mobile",
    },
    {
      badgeCount: 0,
      icon: "settings",
      className: "hide-on-mobile",
    },
    {
      badgeCount: 0,
      icon: "user",
      className: "user-profile",
      onClick: () => setProfileHeaderPopupOpen(!profileHeaderPopupOpen),
    },
  ];

  const popupMenuItems: PopupMenuItemType[] = [
    {
      icon: "user",
      iconPosition: "left",
      text: "Your Profile",
      onClick: () => navigate("/dashboard/profile"), // Not sure if this is the final structure, but it's good enough for demo purposes.
      badgeCount: 0,
    },
    {
      icon: "notifications",
      iconPosition: "left",
      text: "Notifications",
      onClick: undefined,
      badgeCount: 1,
    },
    {
      icon: "settings",
      iconPosition: "left",
      text: "Settings",
      onClick: undefined,
      badgeCount: 0,
    },
    {
      icon: "logout",
      iconPosition: "left",
      text: "Logout",
      onClick: undefined,
      badgeCount: 0,
    },
  ];

  return (
    <div className="dashboard">
      <div className="left">
        <Sidebar
          sections={[
            {
              heading: "Insights",
              items: [
                { icon: "dashboard", text: "Dashboard" },
                { icon: "process", text: "Submission Status" },
                { icon: "quality", text: "Quality" },
              ],
            },
            {
              heading: "Admin Tasks",
              items: [{ icon: "user", text: "Manage Users" }],
            },
          ]}
        />
      </div>
      <div className="right">
        <section>
          <ProfileHeader
            className="profile-header"
            profileHeaderPopupOpen={profileHeaderPopupOpen}
            logo={logo}
            menuItems={menuItems}
            popupMenuItems={popupMenuItems}
          />
        </section>
        {location.pathname.includes("profile") ? (
          <Outlet />
        ) : (
          <section className="main_content">
            <div className="box">
              <p>Welcome {auth.user?.profile.email}</p>
            </div>
            <div className="box">
              <h2>New to DEX?</h2>
              <Button
                className={styles["request-access-btn"]}
                ariaLabel="take a tour"
                variation="outline">
                Take a tour
              </Button>
              <Button
                className={styles["learn-more-btn"]}
                ariaLabel="learn more"
                variation="outline">
                Learn more
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
