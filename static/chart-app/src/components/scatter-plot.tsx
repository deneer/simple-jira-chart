import { router } from "@forge/bridge";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { useTooltip } from "@visx/tooltip";
import React, { useCallback, useMemo, useRef } from "react";
import { ChartPluginResponse } from "../types/chart-plugin-response.type";
import { JiraStatusKey } from "../types/jira-status-key.enum";
import { JitteredIssue } from "../types/jittered-issue.type";
import { getHexColorWithJiraStatusKey } from "../util/issue-color-util";
import Scatter from "./scatter";
import ScatterTooltip from "./scatter-tooltip";

export type ScatterPlotProps = {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  // TODO: remove width and height regarding responsive style as confluence plugin
  width: number;
  height: number;
  xAxis: string;
  yAxis: string;
  sizeAxis: string;
  xDomain: [number, number];
  yDomain: [number, number];
  sizeDomain: [number, number];
  baseUrl: string;
  opacity: number;
  data: JitteredIssue[];
};

function ScatterPlot({
  margin,
  width,
  height,
  xAxis,
  yAxis,
  sizeAxis,
  xDomain,
  yDomain,
  sizeDomain,
  baseUrl,
  opacity,
  data,
}: ScatterPlotProps) {
  /**
   * Set chart width and chart height regarding width and margins
   */
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  /**
   * Set scale regarding chart width and chart height.
   * To prevent rerendering, apply useMemo to scale functions
   */
  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: xDomain,
        range: [0, chartWidth],
        clamp: true,
      }),
    [xDomain, width]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: yDomain,
        range: [chartHeight, 0],
        clamp: true,
      }),
    [yDomain, height]
  );

  const sizeScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: sizeDomain,
        range: [30, sizeDomain[1] * 50],
      }),
    [sizeDomain]
  );

  /**
   * Set svg ref for scatter chart
   */
  const svgRef = useRef<SVGSVGElement>(null);

  /**
   * Set tooltip timeout and hooks
   */
  let tooltipTimeout: number;
  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<ChartPluginResponse>({
    // initial tooltip state
    tooltipOpen: false,
    tooltipLeft: width / 3,
    tooltipTop: height / 3,
  });

  /**
   * Set handler function with useCallback regarding rerender
   */
  const handleMouseMove = useCallback(
    (
      event: React.MouseEvent | React.TouchEvent,
      scatterData: ChartPluginResponse
    ) => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
      if (!svgRef.current) return;

      const currentPoint = localPoint(svgRef.current, event) || { x: 0, y: 0 };

      showTooltip({
        tooltipLeft: currentPoint.x,
        tooltipTop: currentPoint.y,
        tooltipData: scatterData,
      });
    },
    [xScale, yScale, showTooltip]
  );

  const handleMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip();
    }, 10);
  }, [hideTooltip]);

  return (
    <>
      <svg width={width} height={height} ref={svgRef}>
        <rect width={width} height={height} rx={10} fill="#f9fafb" />
        <Group left={margin.left} top={margin.top}>
          <AxisBottom scale={xScale} top={chartHeight} label={xAxis} />
          <AxisLeft scale={yScale} label={yAxis} />
          {data.map((scatter, index) => (
            <Scatter
              key={`scatter-${scatter.issueKey}-${index}`}
              x={xScale(scatter.jitteredX)}
              y={yScale(scatter.jitteredY)}
              size={sizeScale(scatter.size)}
              fill={getHexColorWithJiraStatusKey(
                scatter.status?.statusCategory.key as JiraStatusKey
              )}
              stroke="black"
              strokeWidth={1}
              opacity={opacity}
              cursor="pointer"
              onMouseMove={(e) => handleMouseMove(e, scatter)}
              onMouseLeave={handleMouseLeave}
              onClick={() =>
                router.open(`${baseUrl}/browse/${scatter.issueKey}`)
              }
              onTouchMove={(e) => handleMouseMove(e, scatter)}
              onTouchEnd={handleMouseLeave}
            />
          ))}
        </Group>
      </svg>
      {tooltipOpen &&
        tooltipData &&
        tooltipLeft != null &&
        tooltipTop != null && (
          <ScatterTooltip
            left={tooltipLeft}
            top={tooltipTop}
            xAxis={xAxis}
            yAxis={yAxis}
            sizeAxis={sizeAxis}
            data={tooltipData}
          />
        )}
    </>
  );
}

export default ScatterPlot;
