import ParentSize from "@visx/responsive/lib/components/ParentSizeModern";
import { useAtomValue } from "jotai";
import React from "react";
import { Zoom } from "@visx/zoom";
import ScatterPlot from "../components/scatter-plot";
import {
  jitteredJiraIssuesAtom,
  jiraConfigAtom,
  jiraIssuesXDomainAtom,
  jiraIssuesYDomainAtom,
  jiraIssuesSizeDomainAtom,
} from "../store/atoms/jira.atom";
import { opacityAtom } from "../store/atoms/scatter-plot.atom";

function ScatterPlotContainer() {
  const issueData = useAtomValue(jitteredJiraIssuesAtom);
  const jiraConfig = useAtomValue(jiraConfigAtom);
  const xDomain = useAtomValue(jiraIssuesXDomainAtom);
  const yDomain = useAtomValue(jiraIssuesYDomainAtom);
  const sizeDomain = useAtomValue(jiraIssuesSizeDomainAtom);
  const opacityValue = useAtomValue(opacityAtom);

  return (
    <>
      {/* There's bug that height do not resize properly when height style is 100% */}
      <ParentSize
        parentSizeStyles={{
          width: "100%",
          height: "100%",
          minHeight: "0",
          position: "relative",
          aspectRatio: "4/3",
        }}
      >
        {({ width, height }) => (
          <Zoom<SVGSVGElement>
            width={width}
            height={height}
            scaleXMin={1 / 2}
            scaleXMax={4}
            scaleYMin={1 / 2}
            scaleYMax={4}
            initialTransformMatrix={{
              scaleX: 1,
              scaleY: 1,
              translateX: width / 2 + 60,
              translateY: height / 2 + 30,
              skewX: 0,
              skewY: 0,
            }}
          >
            {(zoom) => (
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
                opacity={opacityValue}
                zoom={zoom}
                data={issueData}
              />
            )}
          </Zoom>
        )}
      </ParentSize>
    </>
  );
}

export default ScatterPlotContainer;
