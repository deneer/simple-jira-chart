import { AxisBottom, AxisLeft } from "@visx/axis";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Circle } from "@visx/shape";
import { useTooltip } from "@visx/tooltip";
import React, { useCallback, useMemo, useRef } from "react";
import { ChartPluginResponse } from "../types/chart-plugin-response.type";
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
  data: ChartPluginResponse[];
};

function ScatterPlot({ margin, width, height, data }: ScatterPlotProps) {
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
        domain: [
          Math.min(...data.map((datum) => datum.x)),
          Math.max(...data.map((datum) => datum.x)),
        ],
        range: [0, chartWidth],
        clamp: true,
      }),
    [width]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [
          Math.min(...data.map((datum) => datum.y)),
          Math.max(...data.map((datum) => datum.y)),
        ],
        range: [chartHeight, 0],
        clamp: true,
      }),
    [height]
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

      const containerX = "clientX" in event ? event.clientX : 0;
      const containerY = "clientY" in event ? event.clientY : 0;

      showTooltip({
        tooltipLeft: containerX,
        tooltipTop: containerY,
        tooltipData: scatterData,
      });
    },
    [xScale, yScale, showTooltip]
  );

  const handleMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip();
    }, 100);
  }, [hideTooltip]);

  return (
    <div>
      <svg width={width} height={height} ref={svgRef}>
        <rect width={width} height={height} rx={10} fill="#f4f4f4" />
        <Group left={margin.left} top={margin.top}>
          <AxisBottom scale={xScale} top={chartHeight} />
          <AxisLeft scale={yScale} />
          {data.map((scatter, index) => (
            <Circle
              key={`scatter-${scatter.issueKey}-${index}`}
              className="dot"
              cx={xScale(scatter.x)}
              cy={yScale(scatter.y)}
              r={scatter.size}
              fill="purple"
              opacity={0.6}
              onMouseMove={(e) => handleMouseMove(e, scatter)}
              onMouseLeave={handleMouseLeave}
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
            data={tooltipData}
          />
        )}
    </div>
  );
}

export default ScatterPlot;
