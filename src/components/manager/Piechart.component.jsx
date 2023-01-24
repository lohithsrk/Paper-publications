import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Status", "Count"],
  ["Reviewed", 2],
  ["Revision", 2],
  ["Submitted", 2],
];

export const options = {
  title: "Analysis",
  pieHole: 0,
  is3D: true,
};

function Piechart() {
  return (
    <Chart
      chartType="PieChart"
      width="110%"
      height="120%"
      data={data}
      options={options}
    />
  );
}

export default Piechart;
