import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import {
  MenuItemType,
  PopupMenuItemType,
} from "@us-gov-cdc/cdc-react/dist/src/@types";

import dexLogo from "src/assets/dex_logo.svg";
import { useSetRecoilState } from "recoil";
import { dataRouteAtom, dataStreamIdAtom } from "src/state/searchParams";
import { dataStreamsAtom } from "src/state/dataStreams";
import getDataStreams, { DataStream } from "src/utils/api/dataStreams";
import { getDataRoutes } from "src/utils/helperFunctions/dataStreams";

import {
  ProfileHeader,
  ProfileHeaderLogo,
  Sidebar,
} from "@us-gov-cdc/cdc-react";

import { Outlet, useNavigate } from "react-router-dom";

import { Icons } from "@us-gov-cdc/cdc-react-icons";

function Shell() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [searchParams] = useSearchParams();

  const logo = <ProfileHeaderLogo image={dexLogo} classNames={["dex-logo"]} />;

  const setDataStreams = useSetRecoilState(dataStreamsAtom);
  const setDataStreamId = useSetRecoilState(dataStreamIdAtom);
  const setDataRoute = useSetRecoilState(dataRouteAtom);

  useEffect(() => {
    const fetchCall = async () => {
      const res = await getDataStreams(auth.user?.access_token || "");

      try {
        const data = await res.json();
        const streams = data?.dataStreams as DataStream[];
        setDataStreams(streams);

        const streamId = searchParams.get("data_stream_id");
        const route = searchParams.get("data_route");
        const userHasDataStream = streams.find(
          (stream: DataStream) => stream.dataStreamId == streamId
        );
        const dataStreamHasRoute = userHasDataStream?.routes.find(
          (r: string) => r == route
        );

        if (!userHasDataStream || !dataStreamHasRoute) {
          const dataStreamId = streams[0].dataStreamId;
          setDataStreamId(dataStreamId);
          const route = getDataRoutes(streams, dataStreamId)[0];
          setDataRoute(route);
        }
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    fetchCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const menuItems: MenuItemType[] = [
    {
      badgeCount: 5,
      icon: <Icons.Bell hasBadge={true} />,
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
      icon: <Icons.Person />,
      iconPosition: "left",
      text: "Your Profile",
      badgeCount: 0,
      onClick: () => navigate("/home/profile"),
    },
    {
      icon: <Icons.Bell hasBadge={true} />,
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
      icon: <Icons.SquareHalfArrowRight />,
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
                  onClick: () => navigate("/home/dashboard"),
                },
                {
                  componentType: "a",
                  icon: <Icons.ArrowUp />,
                  text: "Uploaded Files",
                  onClick: () => navigate("/"),
                },
                {
                  componentType: "a",
                  icon: <Icons.ZigZag />,
                  text: "Track Submissions",
                  onClick: () => navigate("/home/submissions"),
                },
              ],
            },
            {
              heading: "Admin Tasks",
              items: [
                {
                  componentType: "a",
                  icon: <Icons.Person />,
                  text: "Manage Users",
                  onClick: () => navigate("/"),
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
                  onClick: () => navigate("/support"),
                },
                {
                  componentType: "a",
                  icon: <Icons.SquareHalfArrowRight />,
                  text: "Logout",
                  href: "/logout", // TODO: Migrate logout to use an onClick
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
