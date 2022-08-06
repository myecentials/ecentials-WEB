import React, { useLayoutEffect, useRef, useEffect } from "react";
import { OrgChart } from "d3-org-chart";

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  let chart = null;

  function addNode(node) {
    chart.addNode(node);
  }

  props.setClick(addNode);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d) => 0)
        .nodeHeight((d) => 0)
        .onNodeClick((d, i, arr) => {
          console.log(d, "Id of clicked node ");
          props.onNodeClick(d);
        })
        .nodeContent(({ data }) => {
          return "";
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
