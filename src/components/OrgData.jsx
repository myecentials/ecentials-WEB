import React, { useLayoutEffect, useRef } from "react";
// import { OrgChart } from "d3-org-chart";
import * as d3 from "d3";
// import { Link } from "react-router-dom";
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
      // if (!chart) {
      //   chart = new OrgChart();
      // }
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeHeight((d) => 100)
        .nodeWidth((d) => {
          return 220;
        })
        .childrenMargin((d) => 70)
        .compactMarginBetween((d) => 80)
        .compactMarginPair((d) => 50)
        .neightbourMargin((a, b) => 25)
        .siblingsMargin((d) => 25)

        .initialZoom(0.7)
        .buttonContent(({ node, state }) => {
          return `<div style="px;color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${
            node.children
              ? `<i className="fa fa-angle-up"></i>`
              : `<i className="fa fa-angle-down"></i>`
          }</span> ${node.data._directSubordinates}  </div>`;
        })
        .linkUpdate(function (d, i, arr) {
          d3.select(this)
            .attr("stroke", (d) =>
              d.data._upToTheRootHighlighted ? "#152785" : "#E4E2E9"
            )
            .attr("stroke-width", (d) =>
              d.data._upToTheRootHighlighted ? 5 : 1
            );

          if (d.data._upToTheRootHighlighted) {
            d3.select(this).raise();
          }
        })
        .nodeContent(function (d, i, arr, state) {
          const color = "#FFFFFF";
          return `
            <div style="background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: none">
               <div style="background-color:${color};position:absolute;margin-top:-25px;margin-left:${20}px;border-radius:100px;width:50px;height:50px;" ></div>
               <img src=" ${
                 d.data.imageUrl
               }" style="position:absolute;margin-top:-25px;margin-left:${20}px;border-radius:100px;width:50px;height:50px;" />
               
              <div style="color:#A098AE;position:absolute;right:20px;top:17px;font-size:10px;"><a style="color: gray" href="/hrm/staff/name/edit"><i className="fa fa-ellipsis-h"></i></a></div>

              <h6 style="font-size:18px;margin-left:20px;margin-top:32px; color: #303972"> ${
                d.data.name
              } </h6>
              <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:16px;"> ${
                d.data.positionName
              } </div>


           </div>
  `;
        })
        .render();
    }
  }, [props.data, chart]);
  // }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
