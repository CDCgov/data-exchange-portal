import {
  MenuItemType,
  PopupMenuItemType,
} from "@us-gov-cdc/cdc-react/dist/src/@types";

import dexLogo from "./assets/dex_logo.svg";

import {
  ProfileHeader,
  ProfileHeaderLogo,
  Sidebar,
} from "@us-gov-cdc/cdc-react";

import { Outlet, useNavigate } from "react-router-dom";

import { Icons } from "@us-gov-cdc/cdc-react-icons";

function Shell() {
  const navigate = useNavigate();

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
      onClick: () => navigate("/home/profile"),
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
                  href: "/home/dashboard",
                },
                {
                  componentType: "a",
                  icon: <Icons.Process />,
                  text: "Process Status",
                  href: "/",
                },
                {
                  componentType: "a",
                  icon: <Icons.Process />,
                  text: "File Submissions",
                  href: "/home/submissions",
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
        <Outlet />
      </div>
    </div>
  );
}

export default Shell;
