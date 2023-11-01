import { app } from "@azure/functions";
import { uploadStatus } from "./uploadStatus";

app.http("uploadStatus", {
  methods: ["GET"],
  authLevel: "function",
  route: "upload/status/{destinationId:alpha}",
  handler: uploadStatus,
});
