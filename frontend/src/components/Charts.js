import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Charts = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) {
      console.warn("No sales data available for visualization.");
      return;
    }

    // Log data for debugging
    console.log("Data received in Charts component:", data);

    // Remove previous SVG content before rendering
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // SVG Dimensions
    const width = 600, height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    // Create SVG Container
    const chart = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.product)) // Using product names for X-axis
      .range([0, width - margin.left - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.amount) || 100]) // Avoids NaN
      .range([height - margin.top - margin.bottom, 0]);

    // X-Axis
    chart.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Y-Axis
    chart.append("g")
      .call(d3.axisLeft(y));

    // Draw Bars
    chart.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.product))
      .attr("y", d => y(d.amount))
      .attr("width", x.bandwidth())
      .attr("height", d => height - margin.top - margin.bottom - y(d.amount))
      .attr("fill", "steelblue");

  }, [data]);

  return <svg ref={ref}></svg>;
};

export default Charts;
