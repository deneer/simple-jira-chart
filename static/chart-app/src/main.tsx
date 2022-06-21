import { Provider } from "jotai";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LoadingSkeleton from "./components/loading-skeleton";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <Suspense fallback={<LoadingSkeleton />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
