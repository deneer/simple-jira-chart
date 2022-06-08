import { useAtomValue } from "jotai";
import React from "react";
import ScatterPlot from "../components/scatter-plot";
import {
  jitteredJiraIssuesAtom,
  jiraConfigAtom,
  jiraIssuesXDomainAtom,
  jiraIssuesYDomainAtom,
} from "../store/atoms/jira.atom";

function ScatterPlotContainer() {
  const issueData = useAtomValue(jitteredJiraIssuesAtom);
  const jiraConfig = useAtomValue(jiraConfigAtom);
  const xDomain = useAtomValue(jiraIssuesXDomainAtom);
  const yDomain = useAtomValue(jiraIssuesYDomainAtom);

  return (
    <div>
      <ScatterPlot
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        width={600}
        height={400}
        xAxis={JSON.parse(jiraConfig.extension.config.xAxis).name}
        yAxis={JSON.parse(jiraConfig.extension.config.yAxis).name}
        sizeAxis={JSON.parse(jiraConfig.extension.config.zAxis).name}
        baseUrl={jiraConfig.siteUrl}
        xDomain={xDomain}
        yDomain={yDomain}
        data={issueData}
      />
    </div>
  );
}

export default ScatterPlotContainer;
