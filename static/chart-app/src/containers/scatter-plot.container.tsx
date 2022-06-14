import ParentSize from "@visx/responsive/lib/components/ParentSizeModern";
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
    <div className="relative w-full aspect-[4/3]">
      {/* There's bug that height do not resize properly when height style is 100% */}
      <ParentSize parentSizeStyles={{ width: "100%", height: "99%" }}>
        {({ width, height }) => (
          <ScatterPlot
            margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
            width={width}
            height={height}
            xAxis={JSON.parse(jiraConfig.extension.config.xAxis).name}
            yAxis={JSON.parse(jiraConfig.extension.config.yAxis).name}
            sizeAxis={JSON.parse(jiraConfig.extension.config.zAxis).name}
            baseUrl={jiraConfig.siteUrl}
            xDomain={xDomain}
            yDomain={yDomain}
            sizeDomain={sizeDomain}
            data={issueData}
          />
        )}
      </ParentSize>
    </div>
  );
}

export default ScatterPlotContainer;
