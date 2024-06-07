import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  dataRouteAtom,
  dataStreamIdAtom,
  jurisdictionAtom,
  senderIdAtom,
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

interface SearchOptionsProps {
  forSubmissions?: boolean;
  handleFilter?: () => void;
}

function SearchOptions({
  forSubmissions = false,
  handleFilter,
}: SearchOptionsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data_stream_id, setDataStreamId] = useRecoilState(dataStreamIdAtom);
  const [data_route, setDataRoute] = useRecoilState(dataRouteAtom);
  const [timeframe, setTimeframe] = useRecoilState(timeFrameAtom);
  const [jurisdiction, setJurisdiction] = useRecoilState(jurisdictionAtom);
  const [sender_id, setSenderId] = useRecoilState(senderIdAtom);
  const dataStreams = useRecoilValue(dataStreamsAtom);

  useEffect(() => {
    const streamId = searchParams.get("data_stream_id");
    const route = searchParams.get("data_route");
    const tf = searchParams.get("timeframe") as Timeframe;
    const jd = searchParams.get("jurisdiction");
    const senderId = searchParams.get("sender_id");

    if (streamId) setDataStreamId(streamId);
    if (route) setDataRoute(route);
    if (tf) setTimeframe(tf);
    if (jd) setJurisdiction(jd);
    if (senderId) setSenderId(senderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (handleFilter) handleFilter();

    setSearchParams({
      data_stream_id,
      data_route,
      jurisdiction,
      sender_id,
      timeframe,
    });
  }, [
    data_stream_id,
    data_route,
    jurisdiction,
    sender_id,
    timeframe,
    setSearchParams,
  ]);

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

  const handleJurisdiction = (jd: string) => {
    setJurisdiction(jd);
  };

  const handleSender = (senderId: string) => {
    setSenderId(senderId);
  };

  const jurisdictions = [
    "All",
    "USA-AL",
    "USA-AK",
    "USA-AZ",
    "USA-AR",
    "USA-CA",
    "USA-CO",
    "USA-CT",
    "USA-DE",
    "USA-FL",
    "USA-GA",
    "USA-HI",
    "USA-ID",
    "USA-IL",
    "USA-IN",
    "USA-IA",
    "USA-KS",
    "USA-KY",
    "USA-LA",
    "USA-ME",
    "USA-MD",
    "USA-MA",
    "USA-MI",
    "USA-MN",
    "USA-MS",
    "USA-MO",
    "USA-MT",
    "USA-NE",
    "USA-NV",
    "USA-NH",
    "USA-NJ",
    "USA-NM",
    "USA-NY",
    "USA-NC",
    "USA-ND",
    "USA-OH",
    "USA-OK",
    "USA-OR",
    "USA-PA",
    "USA-RI",
    "USA-SC",
    "USA-SD",
    "USA-TN",
    "USA-TX",
    "USA-UT",
    "USA-VT",
    "USA-VA",
    "USA-WA",
    "USA-WV",
    "USA-WI",
    "USA-WY",
  ];

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
          className="padding-right-2"
          items={timeframes}
          label="Timeframe"
          labelIcon={<Icons.Calendar />}
          onSelect={handleTimeframe}
          srText="Timeframe"
          defaultValue={timeframe}
        />
        {forSubmissions && (
          <>
            <Dropdown
              className="padding-right-2"
              items={jurisdictions}
              label="Jurisdiction"
              onSelect={handleJurisdiction}
              srText="Jurisdiction"
              defaultValue={jurisdiction}
            />
            <Dropdown
              className="padding-right-2"
              items={[
                "All",
                "PH-LA",
                "ST-LA",
                "LB-LA",
                "CO-LA",
                "HO-LA",
                "PR-LA",
              ]}
              label="Sender"
              onSelect={handleSender}
              srText="Sender"
              defaultValue={sender_id}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default SearchOptions;
