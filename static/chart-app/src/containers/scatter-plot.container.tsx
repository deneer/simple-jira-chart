import { useAtomValue } from "jotai";
import React from "react";
import ScatterPlot from "../components/scatter-plot";
import {
  jitteredJiraIssuesAtom,
  jiraConfigAtom,
  jiraIssuesXDomainAtom,
  jiraIssuesYDomainAtom,
  jiraIssuesSizeDomainAtom,
} from "../store/atoms/jira.atom";

function ScatterPlotContainer() {
  const issueData = useAtomValue(jitteredJiraIssuesAtom);
  const jiraConfig = useAtomValue(jiraConfigAtom);
  const xDomain = useAtomValue(jiraIssuesXDomainAtom);
  const yDomain = useAtomValue(jiraIssuesYDomainAtom);
  const sizeDomain = useAtomValue(jiraIssuesSizeDomainAtom);

  return (
    <div>
      <ScatterPlot
        margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
        width={600}
        height={400}
        xAxis={JSON.parse(jiraConfig.extension.config.xAxis).name}
        yAxis={JSON.parse(jiraConfig.extension.config.yAxis).name}
        sizeAxis={JSON.parse(jiraConfig.extension.config.zAxis).name}
        baseUrl={jiraConfig.siteUrl}
        xDomain={xDomain}
        yDomain={yDomain}
        sizeDomain={sizeDomain}
        data={issueData}
      />
    </div>
  );
}

export default ScatterPlotContainer;
