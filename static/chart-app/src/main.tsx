import { Provider } from "jotai";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <Suspense fallback={<h2>Loading Data...</h2>}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
