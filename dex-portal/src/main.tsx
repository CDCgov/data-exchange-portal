import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CDCHeader } from "@cdcent/cdcreact";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CDCHeader search={true} />
    <App />
  </React.StrictMode>
);
