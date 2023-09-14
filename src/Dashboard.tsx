import {
  MenuItemType,
  PopupMenuItemType,
} from "@us-gov-cdc/cdc-react/dist/src/@types";

import styles from "./styles/Dashboard.module.css";

import dexLogo from "./assets/dex_logo.svg";

import {
  Button,
  ProfileHeader,
  ProfileHeaderLogo,
  Sidebar,
} from "@us-gov-cdc/cdc-react";

import { useAuth, hasAuthParams } from "react-oidc-context";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "@us-gov-cdc/cdc-react-icons";
import { getEnv } from "./utils";
import { useEffect } from "react";

function Dashboard() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      window.onpageshow = function (event) {
        if (event.persisted) {
          window.location.reload();
        }
      };
    }
  }, [auth]);

  // automatically sign-in
  (async () => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading
    ) {
      const oidcStorage = sessionStorage.getItem(
        `oidc.user:${getEnv("VITE_SAMS_AUTHORITY_URL")}:${getEnv(
          "VITE_SAMS_CLIENT_ID"
        )}`
      );

      if (oidcStorage) {
        await auth.signinSilent();
      }
    }
  })();

  const logo = <ProfileHeaderLogo image={dexLogo} classNames={["dex-logo"]} />;

  const menuItems: MenuItemType[] = [
    {
      badgeCount: 5,
      icon: <Icons.Notifications hasBadge={true} />,
      className: "hide-on-mobile",
      srText: "Notifications button",
    },
    {
      badgeCount: 0,
      icon: <Icons.Settings />,
      className: "hide-on-mobile",
      srText: "Settings button",
    },
  ];

  const userProfilePopupMenuItems: PopupMenuItemType[] = [
    {
      icon: <Icons.User />,
      iconPosition: "left",
      text: "Your Profile",
      badgeCount: 0,
      onClick: () => navigate("/dashboard/profile"),
    },
    {
      icon: <Icons.Notifications hasBadge={true} />,
      iconPosition: "left",
      text: "Notifications",
      badgeCount: 1,
    },
    {
      icon: <Icons.Settings />,
      iconPosition: "left",
      text: "Settings",
      badgeCount: 0,
    },
    {
      icon: <Icons.Logout />,
      iconPosition: "left",
      text: "Logout",
      badgeCount: 0,
      onClick: () => navigate("/logout", { replace: true }),
    },
  ];
  if (auth.isAuthenticated) {
    return (
      <div className="dashboard">
        <div className="left">
          <Sidebar
            sections={[
              {
                heading: "Insights",
                items: [
                  {
                    componentType: "a",
                    icon: <Icons.Dashboard />,
                    text: "Dashboard",
                    href: "/dashboard",
                  },
                  {
                    componentType: "a",
                    icon: <Icons.Process />,
                    text: "Process Status",
                    href: "/",
                  },
                  {
                    componentType: "a",
                    icon: <Icons.Quality />,
                    text: "Quality",
                    href: "/",
                  },
                ],
              },
              {
                heading: "Admin Tasks",
                items: [
                  {
                    componentType: "a",
                    icon: <Icons.User />,
                    text: "Manage Users",
                    href: "/",
                  },
                ],
              },
            ]}
            footer={[
              {
                heading: "",
                items: [
                  {
                    componentType: "a",
                    icon: <Icons.Support />,
                    text: "Support",
                    href: "/support",
                  },
                  {
                    componentType: "a",
                    icon: <Icons.Logout />,
                    text: "Logout",
                    href: "/logout",
                  },
                ],
              },
            ]}
          />
        </div>
        <div className="right">
          <section>
            <ProfileHeader
              logo={logo}
              className="profile-header"
              menuItems={menuItems}
              userProfilePopupMenuItems={userProfilePopupMenuItems}
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
  } else {
    return <Navigate to="/" replace={true} />;
  }
}

export default Dashboard;
