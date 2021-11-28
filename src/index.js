import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import ContentDetailsProvider from "./context/ContentDetailsProvider";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <ContentDetailsProvider>
      <App />
    </ContentDetailsProvider>
  </StrictMode>,
  document.getElementById("app")
);
