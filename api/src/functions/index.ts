import { app } from "@azure/functions";
import { uploadStatus } from "./uploadStatus";
import { oauthCallback } from "./token";

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
