import { DataStreamWithRoutes } from "src/utils/api/dataStreams";

export interface getDataStreamIdsParams {
  data: DataStreamWithRoutes[];
  writeOnly?: boolean;
}

export const getDataStreamIds = ({
  data,
  writeOnly = false,
}: getDataStreamIdsParams): string[] => {
  return data
    .filter(
      (ds) => !writeOnly || ds.routes.some((route) => route.writePermissions)
    )
    .map((ds) => ds.datastream.name);
};

export interface getDataRoutesParams {
  data: DataStreamWithRoutes[];
  dataStreamName: string;
  forUpload?: boolean;
  writeOnly?: boolean;
}

export const getDataRoutes = ({
  data,
  dataStreamName,
  forUpload = false,
  writeOnly = false,
}: getDataRoutesParams): string[] => {
  const dataStream = data.find((el) => el.datastream.name == dataStreamName);

  if (!dataStream) return [];

  const routeNames = dataStream.routes
    .filter((route) => !writeOnly || route.writePermissions)
    .map((route) => route.name);

  if (routeNames.length > 1 && !forUpload) return ["All", ...routeNames];

  return routeNames;
};
