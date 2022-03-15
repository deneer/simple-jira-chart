import ForgeUI, { useEffect, useState } from "@forge/ui";
import { axisBottom, axisLeft, scaleLinear, select } from "d3";

export const ScatterChart = () => {
  const [data] = useState([
    [30, 20],
    [10, 40],
    [60, 40],
    [30, 35],
    [80, 65],
    [90, 130],
  ]);

  useEffect(() => {
    // setting up container
    const w = 400;
    const h = 300;
    const svg = select("#chart-svg")
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-top", "100px");

    // setting up scaling
    const xScale = scaleLinear().domain([0, 100]).range([0, w]);
    const yScale = scaleLinear().domain([0, 200]).range([h, 0]);

    // setting up axis
    const xAxis = axisBottom(xScale).ticks(data.length);
    const yAxis = axisLeft(yScale).ticks(10);
    svg.append("g").call(xAxis).attr("transform", `translsate(0, ${h})`);
    svg.append("g").call(yAxis);

    // setting up axis labeling
    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", h + 50)
      .text("x");
    svg
      .append("text")
      .attr("y", h / 2)
      .attr("x", -50)
      .text("y");

    // setting up svg data
    svg
      .selectAll()
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", 2);
  }, [data]);

  return (
    <div>
      <svg id="chart-svg" />
    </div>
  );
};

export default ScatterChart;
