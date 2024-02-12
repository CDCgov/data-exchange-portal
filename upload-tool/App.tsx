import React, { Fragment } from "react";

import "@us-gov-cdc/cdc-react/dist/style.css";

function App() {
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<Landing />}></Route>
  //     </Routes>
  //   </Router>
  // );
  return (
    <Fragment>
      <h1>File Upload</h1>
      <label htmlFor="portal-upload">Choose a file:</label>
      <input
        type="file"
        id="portal-upload"
        name="portal-upload"
        accept=".csv,.hl7,.txt"
      />
      <p>
        Accepted file types include .csv, .hl7, .txt | Limited to 1 file per
        upload
      </p>
    </Fragment>
  );
}

export default App;
