import { DataStreamWithRoutes } from "src/utils/api/dataStreams";

export const getWriteOnlyDatastreamsWithRoutes = (
  data: DataStreamWithRoutes[]
): DataStreamWithRoutes[] => {
  const writeOnlyDatastreamsWithRoutes = data
    .filter((ds) => ds.routes.some((route) => route.writePermissions))
    .map((ds) => {
      return {
        datastream: { ...ds.datastream },
        routes: ds.routes.filter((r) => r.writePermissions),
      };
    });

  return writeOnlyDatastreamsWithRoutes;
};

export const getDatastreamNames = (data: DataStreamWithRoutes[]): string[] => {
  return data.map((ds) => ds.datastream.name);
};

export const getDatastreamRouteNames = (
  data: DataStreamWithRoutes[],
  dataStreamName: string
): string[] => {
  const dataStream = data.find((el) => el.datastream.name == dataStreamName);

  if (!dataStream) return [];

  const routeNames = dataStream.routes.map((route) => route.name);

  return routeNames;
};
