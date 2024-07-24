import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MenuItemType,
  PopupMenuItemType,
} from "@us-gov-cdc/cdc-react/dist/src/@types";

import dexLogo from "src/assets/dex_logo.svg";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { dataRouteAtom, dataStreamIdAtom } from "src/state/searchParams";
import { dataStreamsAtom } from "src/state/dataStreams";
import { DataStreamWithRoutes } from "src/utils/api/dataStreams";
import { Route } from "src/utils/api/routes";
import { getDataRoutes } from "src/utils/helperFunctions/metadataFilters";
import useDecodeAuthToken from "src/utils/hooks/useDecodeAuthToken";

import {
  ProfileHeader,
  ProfileHeaderLogo,
  Sidebar,
} from "@us-gov-cdc/cdc-react";

import { Outlet, useNavigate } from "react-router-dom";

import { Icons } from "@us-gov-cdc/cdc-react-icons";

function Shell() {
  useDecodeAuthToken();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const logo = <ProfileHeaderLogo image={dexLogo} classNames={["dex-logo"]} />;

  const streams = useRecoilValue(dataStreamsAtom);
  const setDataStreamId = useSetRecoilState(dataStreamIdAtom);
  const setDataRoute = useSetRecoilState(dataRouteAtom);

  useEffect(() => {
    const setUserDatastreams = async () => {
      try {
        const streamId = searchParams.get("data_stream_id");
        const route = searchParams.get("data_route");
        const userHasDataStream = streams.find(
          (stream: DataStreamWithRoutes) => stream.datastream.name == streamId
        );
        const dataStreamHasRoute = userHasDataStream?.routes.find(
          (r: Route) => r.name == route
        );

        if (!userHasDataStream || !dataStreamHasRoute) {
          const dataStreamId = streams[0].datastream.name;
          setDataStreamId(dataStreamId);
          const route = getDataRoutes({
            data: streams,
            dataStreamName: dataStreamId,
          })[0];
          setDataRoute(route);
        }
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };

    if (streams.length > 0) setUserDatastreams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streams]);

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
                  text: "Upload Files",
                  onClick: () => navigate("/home/upload"),
                },
                {
                  componentType: "a",
                  icon: <Icons.ZigZag />,
                  text: "Track Submissions",
                  onClick: () => navigate("/home/submissions"),
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
