import {
  Button,
  Icon,
  ProfileHeader,
  ProfileHeaderLogo,
  ProfileHeaderMenuItem,
  ProfileHeaderNotification,
  ProfileHeaderPopupMenuItem,
  Sidebar,
} from "@us-gov-cdc/cdc-react";
import { Dispatch, SetStateAction, useState } from "react";
import dexLogo from "./assets/dex_logo.svg";

const logo = <ProfileHeaderLogo image={dexLogo} classNames={["logo"]} />;

const menu = (
  menuClassName: string,
  setProfileHeaderPopupOpen: Dispatch<SetStateAction<boolean>>
) => {
  return (
    <div className={menuClassName}>
      <ProfileHeaderMenuItem className="profile-header-menu-item hide-on-mobile">
        <Icon name="settings" />
      </ProfileHeaderMenuItem>
      <ProfileHeaderMenuItem
        className="profile-header-menu-item user-profile"
        onClick={() => setProfileHeaderPopupOpen((e: boolean) => !e)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 40 40"
          fill="none"
          className="user-image"
          stroke="#ddd"
        >
          <circle cx="20" cy="20" r="20"></circle>
        </svg>
        <Icon name="chevron-down" className="chevron-down" />
      </ProfileHeaderMenuItem>
    </div>
  );
};

const popupMenu = (
  popupMenuWrapClassName: string,
  popupMenuClassName: string,
  profileHeaderPopupOpen: boolean,
  profileHeaderNotifications: ProfileHeaderNotification[]
) => {
  return (
    <div
      className={popupMenuWrapClassName}
      style={{ display: !profileHeaderPopupOpen ? "none" : " flex" }}
    >
      <div className={popupMenuClassName}>
        <ProfileHeaderPopupMenuItem className="profile-header-popup-menu-item">
          <span className="profile-header-popup-menu-item-left">
            <Icon name="user" />
          </span>
          <span className="profile-header-popup-menu-item-center">
            Your Profile
          </span>
        </ProfileHeaderPopupMenuItem>
        <ProfileHeaderPopupMenuItem className="profile-header-popup-menu-item">
          <span className="profile-header-popup-menu-item-left">
            <Icon name="notifications" />
          </span>
          <span className="profile-header-popup-menu-item-center">
            Notifications
          </span>
          <span className="profile-header-popup-menu-item-right">
            <svg
              className="notification-count"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="10"
                cy="12"
                r="10"
                fill="#AF4448"
                style={{
                  display:
                    profileHeaderNotifications.length > 0 ? "flex" : "none",
                }}
              ></circle>
              <text
                style={{
                  display:
                    profileHeaderNotifications.length > 0 ? "flex" : "none",
                }}
                alignmentBaseline="middle"
                x="10"
                y="12.5"
                textAnchor="middle"
              >
                {profileHeaderNotifications.length}
              </text>
            </svg>
          </span>
        </ProfileHeaderPopupMenuItem>
        <ProfileHeaderPopupMenuItem className="profile-header-popup-menu-item">
          <span className="profile-header-popup-menu-item-left">
            <Icon name="settings" />
          </span>
          <span className="profile-header-popup-menu-item-center">
            Settings
          </span>
        </ProfileHeaderPopupMenuItem>
        <ProfileHeaderPopupMenuItem className="profile-header-popup-menu-item">
          <span className="profile-header-popup-menu-item-left">
            <Icon name="logout" />
          </span>
          <span className="profile-header-popup-menu-item-center">Logout</span>
        </ProfileHeaderPopupMenuItem>
      </div>
    </div>
  );
};
function Dashboard() {
  const [profileHeaderPopupOpen, setProfileHeaderPopupOpen] = useState(false);
  const [profileHeaderNotifications] = useState([{ type: "alert" }]);

  return (
    <div className="dashboard">
      <div className="left">
        <Sidebar
          sections={[
            {
              heading: "Insights",
              items: [
                { icon: "dashboard", text: "Dashboard" },
                { icon: "process", text: "Process Status" },
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
            logo={logo}
            menu={menu("profile-header-menu-items", setProfileHeaderPopupOpen)}
            popupMenu={popupMenu(
              "profile-header-popup-wrap",
              "profile-header-popup",
              profileHeaderPopupOpen,
              profileHeaderNotifications
            )}
          />
        </section>
        <section className="main_content">
          <div className="box">
            <h2>TBD</h2>
          </div>
          <div className="box">
            <h2>New to DEX?</h2>
            <Button ariaLabel="request access" variation="outline">
              Request access
            </Button>
            <Button ariaLabel="learn more" variation="outline">
              Learn more
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
