import { invoke } from "@forge/bridge";
import React, { useEffect, useState } from "react";
import ScatterPlot from "./components/ScatterPlot";

function App() {
  const [data, setData]: any = useState(null);

  useEffect(() => {
    invoke("getIssues", { req: "this is request" }).then((res: any) => {
      console.log(res);
      setData(res.payload);
    });
  }, []);

  return <div>{data ? <ScatterPlot plotData={data} /> : "Loading ..."}</div>;
}

export default App;
