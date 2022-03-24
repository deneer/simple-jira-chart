import { invoke, view } from "@forge/bridge";
import React, { useEffect, useState } from "react";
import ExcludedList from "./components/ExcludedList";
import ScatterPlotContainer from "./containers/ScatterPlotContainer";

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
        setPlotData(res.payload.filter((issue: any) => issue.x && issue.y));
        setExcludedData(
          res.payload.filter((issue: any) => !(issue.x || issue.y))
        );
        setError(res.error);
        setDone(res.done);
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
            <ScatterPlotContainer
              plotData={plotData}
              xAxis={JSON.parse(config.xAxis).name}
              yAxis={JSON.parse(config.yAxis).name}
              zAxis={JSON.parse(config.zAxis).name}
            />
            <ExcludedList data={excludedData} />
          </>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
