import { app } from "@azure/functions";
import { uploadStatus } from "./uploadStatus";
import { oauthCallback } from "./token";
import { getDestination } from "./getDestination";

app.http("token", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: oauthCallback,
});

app.http("uploadStatus", {
  methods: ["GET"],
  authLevel: "function",
  route: "upload/status/{destinationId:alpha}",
  handler: uploadStatus,
});

app.http("getDestination", {
  methods: ["GET"],
  authLevel: "function",
  route: "upload/destination",
  handler: getDestination,
});
