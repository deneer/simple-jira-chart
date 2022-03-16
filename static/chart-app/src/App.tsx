import { invoke, view } from "@forge/bridge";
import React, { useEffect, useState } from "react";
import ExcludedList from "./components/ExcludedList";
import ScatterPlot from "./components/ScatterPlot";

function App() {
  const [plotData, setPlotData]: any = useState(null);
  const [excludedData, setExcludedData] = useState([]);
  const [done, setDone] = useState<boolean>(false);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const context: any = await view.getContext();
      console.log("context", context);
      const {
        extension: { config },
      } = context;
      setConfig(config);
      invoke("getIssues", {}).then((res: any) => {
        setPlotData(res.payload.filter((issue: any) => issue.x && issue.y));
        setExcludedData(
          res.payload.filter((issue: any) => !(issue.x && issue.y))
        );
        setDone(res.done);
      });
    };
    getData();
  }, []);

  return (
    <div>
      {done ? (
        <>
          <ScatterPlot
            plotData={plotData}
            xAxisName={JSON.parse(config.xAxis).name}
            yAxisName={JSON.parse(config.yAxis).name}
            zAxisName={JSON.parse(config.zAxis).name}
          />
          <ExcludedList data={excludedData} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
