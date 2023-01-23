import React from "react";
import { PieChart } from "react-minimal-pie-chart";

function Piechart_component() {
  return (
    <div>
      <PieChart
        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
        reveal="40%"
        animate="true"
        animationDuration="1000"
        labelPosition={60}
      
        labelStyle={{
          fontSize: "7px",
          fontColor: "FFFFFA",
        }}
        lineWidth={30}
        rounded="true"
        data={[
          { title: "One", value: 10, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" },
        ]}
      />
    </div>
  );
}

export default Piechart_component;
