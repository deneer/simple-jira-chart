import { invoke, view } from "@forge/bridge";
import React, { useEffect, useState } from "react";
import ExcludedList from "./components/ExcludedList";
import ScatterPlot from "./components/ScatterPlot";

function App() {
  const [plotData, setPlotData]: any = useState([]);
  const [excludedData, setExcludedData] = useState([]);
  const [done, setDone] = useState<boolean>(false);
  const [config, setConfig] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const context: any = await view.getContext();
      const {
        extension: { config },
      } = context;
      setConfig(config);
      invoke("getIssues", {}).then((res: any) => {
        setPlotData(
          res.payload.filter((issue: any) => issue.x && issue.y && issue.z)
        );
        setExcludedData(
          res.payload.filter((issue: any) => !(issue.x && issue.y && issue.z))
        );
        setDone(res.done);
        setError(res.error);
      });
    };
    getData();
  }, []);

  return (
    <div>
      {done ? (
        error ? (
          <p>Error occured. Please check your jql or fields.</p>
        ) : (
          <>
            <ScatterPlot
              plotData={plotData}
              xAxisName={JSON.parse(config.xAxis).name}
              yAxisName={JSON.parse(config.yAxis).name}
              zAxisName={JSON.parse(config.zAxis).name}
            />
            {excludedData.length > 0 && <ExcludedList data={excludedData} />}
          </>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;