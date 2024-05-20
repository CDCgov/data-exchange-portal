import { DataStream } from "src/utils/api/dataStreams";

export const getDataStreamIds = (data: DataStream[]) => {
  const dataStreamIds: string[] = data.map((el: DataStream) => el.name);
  return dataStreamIds;
};

export const getDataRoutes = (data: DataStream[], dataStreamName: string) => {
  const dataStream: DataStream | undefined = data.find(
    (el: DataStream) => el.name == dataStreamName
  );

  if (!dataStream) return [];

  if (dataStream.routes.length > 1) return ["All", ...dataStream.routes];

  return dataStream.routes;
};