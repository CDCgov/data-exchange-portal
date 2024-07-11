import { DataStreamWithRoutes } from "src/utils/api/dataStreams";
import { Route } from "src/utils/api/routes";
import { SelectOption } from "src/components/formFields/Select";

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
  dataStreamName: string
): SelectOption[] => {
  const dataStream: DataStreamWithRoutes | undefined = data.find(
    (el: DataStreamWithRoutes) => el.datastream.name == dataStreamName
  );

  if (!dataStream) return [];

  const routeNames = dataStream.routes.map((r: Route) => ({
    value: r.name,
    display: r.name,
  }));

  return routeNames;
};
