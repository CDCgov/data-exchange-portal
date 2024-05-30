import { DataStreamWithRoutes } from "src/utils/api/dataStreams";
import { Route } from "src/utils/api/routes";

export const getDataStreamIds = (data: DataStreamWithRoutes[]) => {
  const dataStreamIds: string[] = data.map(
    (el: DataStreamWithRoutes) => el.datastream.name
  );
  return dataStreamIds;
};

export const getDataRoutes = (
  data: DataStreamWithRoutes[],
  dataStreamName: string
): string[] => {
  const dataStream: DataStreamWithRoutes | undefined = data.find(
    (el: DataStreamWithRoutes) => el.datastream.name == dataStreamName
  );

  if (!dataStream) return [];

  const routeNames = dataStream.routes.map((r: Route) => r.name);

  if (routeNames.length > 1) return ["All", ...routeNames];

  return routeNames;
};
