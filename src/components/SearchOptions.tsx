import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  dataRouteAtom,
  dataStreamIdAtom,
  endDateAtom,
  jurisdictionAtom,
  senderIdAtom,
  startDateAtom,
  timeFrameAtom,
} from "src/state/searchParams";
import { dataStreamsAtom } from "src/state/dataStreams";

import Select, { SelectOption } from "src/components/formFields/Select";
import TextInput from "src/components/formFields/TextInput";
import {
  getDataRoutes,
  getDataStreamOptions,
  getRoutesOptions,
} from "src/utils/helperFunctions/metadataFilters";
import { Timeframe, timeframeOptions } from "src/types/timeframes";

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
  const [endDate, setEndDate] = useRecoilState(endDateAtom);
  const [timeframe, setTimeframe] = useRecoilState(timeFrameAtom);
  const [jurisdiction, setJurisdiction] = useRecoilState(jurisdictionAtom);
  const [sender_id, setSenderId] = useRecoilState(senderIdAtom);
  const [startDate, setStartDate] = useRecoilState(startDateAtom);
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
    handleFilter,
    setSearchParams,
  ]);

  const handleDataStreamId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dataStreamId = e.target.value;
    setDataStreamId(dataStreamId);
    const route = getDataRoutes(dataStreams, dataStreamId)[0];
    setDataRoute(route);
  };

  const handleDataRoute = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataRoute(e.target.value);
  };

  const handleTimeframe = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const timeframe = e.target.value as Timeframe;
    setTimeframe(timeframe);
  };

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setStartDate(date);
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setEndDate(date);
  };

  const handleJurisdiction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJurisdiction(e.target.value);
  };

  const handleSender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSenderId(e.target.value);
  };

  const jurisdictions: SelectOption[] = [
    { value: "All", display: "All" },
    { value: "USA-AL", display: "USA-AL" },
    { value: "USA-AK", display: "USA-AK" },
    { value: "USA-AZ", display: "USA-AZ" },
    { value: "USA-AR", display: "USA-AR" },
    { value: "USA-CA", display: "USA-CA" },
    { value: "USA-CO", display: "USA-CO" },
    { value: "USA-CT", display: "USA-CT" },
    { value: "USA-DE", display: "USA-DE" },
    { value: "USA-FL", display: "USA-FL" },
    { value: "USA-GA", display: "USA-GA" },
    { value: "USA-HI", display: "USA-HI" },
    { value: "USA-ID", display: "USA-ID" },
    { value: "USA-IL", display: "USA-IL" },
    { value: "USA-IN", display: "USA-IN" },
    { value: "USA-IA", display: "USA-IA" },
    { value: "USA-KS", display: "USA-KS" },
    { value: "USA-KY", display: "USA-KY" },
    { value: "USA-LA", display: "USA-LA" },
    { value: "USA-ME", display: "USA-ME" },
    { value: "USA-MD", display: "USA-MD" },
    { value: "USA-MA", display: "USA-MA" },
    { value: "USA-MI", display: "USA-MI" },
    { value: "USA-MN", display: "USA-MN" },
    { value: "USA-MS", display: "USA-MS" },
    { value: "USA-MO", display: "USA-MO" },
    { value: "USA-MT", display: "USA-MT" },
    { value: "USA-NE", display: "USA-NE" },
    { value: "USA-NV", display: "USA-NV" },
    { value: "USA-NH", display: "USA-NH" },
    { value: "USA-NJ", display: "USA-NJ" },
    { value: "USA-NM", display: "USA-NM" },
    { value: "USA-NY", display: "USA-NY" },
    { value: "USA-NC", display: "USA-NC" },
    { value: "USA-ND", display: "USA-ND" },
    { value: "USA-OH", display: "USA-OH" },
    { value: "USA-OK", display: "USA-OK" },
    { value: "USA-OR", display: "USA-OR" },
    { value: "USA-PA", display: "USA-PA" },
    { value: "USA-RI", display: "USA-RI" },
    { value: "USA-SC", display: "USA-SC" },
    { value: "USA-SD", display: "USA-SD" },
    { value: "USA-TN", display: "USA-TN" },
    { value: "USA-TX", display: "USA-TX" },
    { value: "USA-UT", display: "USA-UT" },
    { value: "USA-VT", display: "USA-VT" },
    { value: "USA-VA", display: "USA-VA" },
    { value: "USA-WA", display: "USA-WA" },
    { value: "USA-WV", display: "USA-WV" },
    { value: "USA-WI", display: "USA-WI" },
    { value: "USA-WY", display: "USA-WY" },
  ];

  const senders: SelectOption[] = [
    { value: "All", display: "All" },
    { value: "PH-LA", display: "PH-LA" },
    { value: "ST-LA", display: "ST-LA" },
    { value: "LB-LA", display: "LB-LA" },
    { value: "CO-LA", display: "CO-LA" },
    { value: "HO-LA", display: "HO-LA" },
    { value: "PR-LA", display: "PR-LA" },
  ];

  return (
    <div className={`display-flex flex-justify-start padding-bottom-4`}>
      <Select
        className="padding-right-2 flex-1 search-option"
        id="data-stream-filter"
        label="Data Stream"
        onChange={handleDataStreamId}
        options={getDataStreamOptions(dataStreams)}
        defaultValue={data_stream_id}
      />
      <Select
        className="padding-right-2 flex-1 search-option"
        id="data-route-filter"
        label="Data Route"
        onChange={handleDataRoute}
        options={getRoutesOptions(dataStreams, data_stream_id)}
        defaultValue={data_route}
      />
      <Select
        className="padding-right-2 flex-1 search-option"
        id="timeframe-filter"
        label="Timeframe"
        onChange={handleTimeframe}
        options={timeframeOptions}
        defaultValue={timeframe}
      />
      {timeframe == Timeframe.Custom && (
        <>
          <TextInput
            className="padding-right-2 flex-1 search-option"
            id="startDate"
            label="Start Date"
            onChange={handleStartDate}
            placeholder="YYYY-MM-DDTHH:MM:SSZ"
            defaultValue={startDate}
          />
          <TextInput
            className="padding-right-2 flex-1 search-option"
            id="endDate"
            label="End Date"
            onChange={handleEndDate}
            placeholder="YYYY-MM-DDTHH:MM:SSZ"
            defaultValue={endDate}
          />
        </>
      )}
      {forSubmissions && (
        <>
          <Select
            className="padding-right-2 flex-1 search-option"
            id="jurisdiction-filter"
            label="Jurisdiction"
            onChange={handleJurisdiction}
            options={jurisdictions}
            defaultValue={jurisdiction}
          />
          <Select
            className="padding-right-2 flex-1 search-option"
            id="sender-id-filter"
            label="Sender"
            onChange={handleSender}
            options={senders}
            defaultValue={sender_id}
          />
        </>
      )}
    </div>
  );
}

export default SearchOptions;
