import { DataStreamWithRoutes } from "src/utils/api/dataStreams";
import { Route } from "src/utils/api/routes";
import { SelectOption } from "src/components/formFields/Select";

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

export const getDataStreamOptions = (
  data: DataStreamWithRoutes[]
): SelectOption[] => {
  const dataStreamOptions: SelectOption[] = data.map(
    (el: DataStreamWithRoutes) => ({
      value: el.datastream.name,
      display: el.datastream.name,
    })
  );
  return dataStreamOptions;
};

export const getRoutesOptions = (
  data: DataStreamWithRoutes[],
  dataStreamName: string,
  forUpload: boolean = false
): SelectOption[] => {
  const dataStream: DataStreamWithRoutes | undefined = data.find(
    (el: DataStreamWithRoutes) => el.datastream.name == dataStreamName
  );

  if (!dataStream) return [];

  const routeNames = dataStream.routes.map((r: Route) => ({
    value: r.name,
    display: r.name,
  }));

  if (routeNames.length > 1 && !forUpload)
    return [{ value: "All", display: "All" }, ...routeNames];

  return routeNames;
};
