import React from "react";

import { Button, Divider } from "@us-gov-cdc/cdc-react";

import { Icons } from "@us-gov-cdc/cdc-react-icons";

import "@us-gov-cdc/cdc-react/dist/style.css";

function App() {
  const fileTypes = [".csv", ".hl7", ".txt"];

  const handleFileUpload = () => {
    document?.getElementById("file-uploader")?.click();
  };

  const handleInputChange = (e) => {
    const file = document.getElementById("file-uploader")?.files[0];
    const fileName = document.getElementById("file-name");
    fileName.textContent = file.name;
  };

  return (
    <React.Fragment>
      <h1>File Upload</h1>
      <div className="display-flex flex-row flex-justify-start flex-align-center">
        <div className="margin-right-2">
          <Button
            id="upload-button"
            ariaLabel="Choose a file"
            icon={<Icons.Folder />}
            iconPosition="left"
            size="big"
            onClick={handleFileUpload}>
            Choose a file
          </Button>
          <input
            type="file"
            id="file-uploader"
            name="file-uploader"
            accept={fileTypes.toString()}
            multiple
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <p id="file-name" className="text-italic text-normal">
          No file chosen
        </p>
      </div>
      <p className="text-italic text-normal">
        Accepted file types include .csv, .hl7, .txt{" "}
        <span className="text-no-italic margin-x-105">|</span>Limited to 1 file
        per upload
      </p>
      <Divider height={2} stroke="#000" width={1000} />
    </React.Fragment>
  );
}

export default App;
