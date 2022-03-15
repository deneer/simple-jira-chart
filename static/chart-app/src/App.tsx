import { invoke, view } from "@forge/bridge";
import React, { useEffect, useState } from "react";
import ScatterPlot from "./components/ScatterPlot";

function App() {
  const [data, setData]: any = useState(null);

  useEffect(() => {
    const getData = async () => {
      const context: any = await view.getContext();
      console.log("context", context);
      invoke("getIssues", {}).then((res: any) => {
        console.log(res);
        setData(res.payload);
      });
    };
    getData();
  }, []);

  return (
    <div>
      {data ? (
        <ScatterPlot
          plotData={data}
          xAxisName="중요도"
          yAxisName="긴급도"
          zAxisName="스토리타임 estimate"
        />
      ) : (
        "Loading ..."
      )}
    </div>
  );
}

export default App;
