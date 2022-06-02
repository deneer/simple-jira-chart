import { useAtomValue } from "jotai";
import React from "react";
import ScatterPlot from "../components/scatter-plot";
import { filteredJiraIssuesAtom } from "../store/atoms/jira.atom";

function ScatterPlotContainer() {
  const issueData = useAtomValue(filteredJiraIssuesAtom);

  return (
    <div>
      <ScatterPlot
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        width={600}
        height={400}
        data={issueData}
      />
    </div>
  );
}

export default ScatterPlotContainer;
