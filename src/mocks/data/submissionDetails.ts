export const mockSubmissionDetails = {
  status: "Uploading",
  tracing: [
    {
      stage: "dex-upload",
      timestamp: "2024-03-27T17:19:19.909Z",
      tags: [
        {
          key: "string",
          value: "string",
        },
      ],
    },
  ],
  percent_complete: 0.65,
  file_name: "largefile.csv",
  file_size_bytes: 190840042,
  bytes_uploaded: 124046027,
  tus_upload_id: "8923c9ff-6afa-42b2-a67b-89cb37e047e6",
  time_uploading_sec: 34.4,
  timestamp: "string",
  metadata: [
    {
      key: "string",
      value: "string",
    },
  ],
};

export const mockValidationReports = {
  upload_id: "6f8010917c0acc4dd329d21625ce1144",
  data_stream_id: "aims-celr",
  data_stream_route: "hl7",
  reports: [
    {
      report_id: "a9c632ca-6614-4bd0-9f3a-03fe23466c35",
      stage_name: "dex-routing",
      timestamp: "2024-03-23T12:24:36.448Z",
      content: {
        result: "success",
        schema_version: "0.0.1",
        file_destination_blob_url: "https://url-to-file-location.txt",
        file_source_blob_url: "https://url-to-file-source.txt",
        schema_name: "dex-file-copy",
        timestamp: "2024-03-23T12:24:36.431+0000",
      },
    },
  ],
};
