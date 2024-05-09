import { useEffect } from "react";
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
  const [dataStreamId, setDataStreamId] = useRecoilState(dataStreamIdAtom);
  const [dataRoute, setDataRoute] = useRecoilState(dataRouteAtom);
  const [timeframe, setTimeframe] = useRecoilState(timeFrameAtom);
  const dataStreams = useRecoilValue(dataStreamsAtom);

  useEffect(() => {
    // TODO: gather query params and check against users datastreams
  }, []);

  const handleDataStream = (dataStreamId: string) => {
    setDataStreamId(dataStreamId);
    const route = getDataRoutes(dataStreams, dataStreamId)[0];
    setDataRoute(route);
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
          onSelect={handleDataStream}
          srText="Data Stream"
          defaultValue={dataStreamId}
        />
        <Dropdown
          className="padding-right-2"
          items={getDataRoutes(dataStreams, dataStreamId)}
          label="Route"
          onSelect={setDataRoute}
          srText="Data Route"
          defaultValue={dataRoute}
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
