import React, { useLayoutEffect, useRef, useEffect } from "react";
import { OrgChart } from "d3-org-chart";
import StaffCard from "./StaffCard";

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
        .initialZoom(3)
        .onNodeClick((d, i, arr) => {
          console.log(d, "Id of clicked node ");
          props.onNodeClick(d);
        })
        .nodeContent(
          (
            d,
            i,
            arr,
            state
          ) => `<div style: "padding: 30px; background-color: red;">
            Hello
        </div>`
        )
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
