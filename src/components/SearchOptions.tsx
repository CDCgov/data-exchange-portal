import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  dataRouteAtom,
  dataStreamIdAtom,
  timeFrameAtom,
} from "src/state/searchParams";
import { dataStreamsAtom } from "src/state/dataStreams";

import { Dropdown } from "@us-gov-cdc/cdc-react";
import { Icons } from "@us-gov-cdc/cdc-react-icons";

import {
  getDataRoutes,
  getDataStreamIds,
} from "src/utils/helperFunctions/dataStreams";
import timeframes, { Timeframe } from "src/types/timeframes";

function SearchOptions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data_stream_id, setDataStreamId] = useRecoilState(dataStreamIdAtom);
  const [data_route, setDataRoute] = useRecoilState(dataRouteAtom);
  const [timeframe, setTimeframe] = useRecoilState(timeFrameAtom);
  const dataStreams = useRecoilValue(dataStreamsAtom);

  useEffect(() => {
    const streamId = searchParams.get("data_stream_id");
    const route = searchParams.get("data_route");
    const timeframe = searchParams.get("timeframe") as Timeframe;

    if (streamId) setDataStreamId(streamId);
    if (route) setDataRoute(route);
    if (timeframe) setTimeframe(timeframe);
  }, []);

  useEffect(() => {
    setSearchParams({ data_stream_id, data_route, timeframe });
  }, [data_stream_id, data_route, timeframe]);

  const handleDataStreamId = (dataStreamId: string) => {
    setDataStreamId(dataStreamId);
    const route = getDataRoutes(dataStreams, dataStreamId)[0];
    setDataRoute(route);
  };

  const handleDataRoute = (dataRoute: string) => {
    setDataRoute(dataRoute);
  };

  const handleTimeframe = (time: string) => {
    const timeframe = time as Timeframe;
    setTimeframe(timeframe);
  };

  return (
    <div className="padding-bottom-2 display-flex flex-row flex-justify">
      <div className="display-flex flex-row cdc-submissions-page--filters">
        <Dropdown
          className="padding-right-2"
          items={getDataStreamIds(dataStreams)}
          label="Data Stream"
          onSelect={handleDataStreamId}
          srText="Data Stream"
          defaultValue={data_stream_id}
        />
        <Dropdown
          className="padding-right-2"
          items={getDataRoutes(dataStreams, data_stream_id)}
          label="Route"
          onSelect={handleDataRoute}
          srText="Data Route"
          defaultValue={data_route}
        />
        <Dropdown
          items={timeframes}
          label="Timeframe"
          labelIcon={<Icons.Calendar />}
          onSelect={handleTimeframe}
          srText="Timeframe"
          defaultValue={timeframe}
        />
      </div>
    </div>
  );
}

export default SearchOptions;
