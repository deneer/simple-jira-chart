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
import RefreshContainer from "./refresh.container";
import { OpacityRangeSliderContainer } from "./opacity-range-slider.container";

function ScatterPlotContainer() {
  const issueData = useAtomValue(jitteredJiraIssuesAtom);
  const jiraConfig = useAtomValue(jiraConfigAtom);
  const xDomain = useAtomValue(jiraIssuesXDomainAtom);
  const yDomain = useAtomValue(jiraIssuesYDomainAtom);
  const sizeDomain = useAtomValue(jiraIssuesSizeDomainAtom);
  const opacityValue = useAtomValue(opacityAtom);

  return (
    <>
      <ParentSize
        parentSizeStyles={{
          width: "100%",
        }}
      >
        {({ width, height }) => (
          <Zoom<SVGSVGElement>
            width={width}
            height={width}
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
              <>
                <RefreshContainer />
                <ScatterPlot
                  margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
                  width={width}
                  height={width}
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
                <OpacityRangeSliderContainer />
              </>
            )}
          </Zoom>
        )}
      </ParentSize>
    </>
  );
}

export default ScatterPlotContainer;
