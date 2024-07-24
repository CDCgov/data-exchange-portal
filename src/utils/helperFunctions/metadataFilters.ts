import { DataStreamWithRoutes } from "src/utils/api/dataStreams";
import { RouteWithPermissions } from "src/utils/api/routes";

export const getDataStreamIds = (data: DataStreamWithRoutes[]) => {
  return data.map((el: DataStreamWithRoutes) => el.datastream.name);
};

export const getDataRoutes = (
  data: DataStreamWithRoutes[],
  dataStreamName: string,
  forUpload: boolean = false
): string[] => {
  const dataStream = data.find(
    (el: DataStreamWithRoutes) => el.datastream.name == dataStreamName
  );

  if (!dataStream) return [];

  const routeNames = dataStream.routes.map((r: RouteWithPermissions) => r.name);

  if (routeNames.length > 1 && !forUpload) return ["All", ...routeNames];

  return routeNames;
};

export const getDataStreamIdsWriteOnly = (data: DataStreamWithRoutes[]) => {
  return data
    .filter((ds) => ds.routes.some((route) => route.writePermissions))
    .map((ds) => ds.datastream.name);
};

export const getDataRoutesWriteOnly = (
  data: DataStreamWithRoutes[],
  dataStreamName: string,
  forUpload: boolean = false
): string[] => {
  const dataStream = data.find((el) => el.datastream.name == dataStreamName);

  if (!dataStream) return [];

  const routeNames = dataStream.routes
    .filter((route) => route.writePermissions)
    .map((route) => route.name);

  if (routeNames.length > 1 && !forUpload) return ["All", ...routeNames];

  return routeNames;
};
