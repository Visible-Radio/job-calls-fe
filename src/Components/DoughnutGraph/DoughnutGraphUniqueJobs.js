import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const DoughnutGraph = ({ datasets, colors }) => {
  const canvasRef = useRef();

  const scaleDoughnutText = () => {
    const doughnutGraphElement = document.querySelector(".DoughnutGraph2");
    const grandTotalElement = document.querySelector("#grandTotal2");
    const width = doughnutGraphElement.offsetWidth;
    grandTotalElement.style.fontSize = `${width / 10}px`;
    const textWidth = grandTotalElement.offsetWidth;
    const left = width / 2 - textWidth / 2;
    grandTotalElement.style.left = `${left}px`;
  };

  const initChartData = (myChart) => {
    myChart.data.datasets[0].data = Object.values(datasets);
    myChart.data.labels = Object.keys(datasets);
    myChart.data.datasets[0].backgroundColor = [];

    for (let key in datasets) {
      if (key === "Date" || key === "Total") continue;
      myChart.data.labels.push(key);

      myChart.data.datasets[0].backgroundColor.push(colors[key]);
    }
  };

  const grandTotal = () => {
    const grandTotal = Object.values(datasets).reduce(
      (acc, element) => (acc += Number(element)),
      0
    );
    return grandTotal;
  };

  useEffect(() => {
    window.addEventListener("resize", scaleDoughnutText);

    const myChart = new Chart(canvasRef.current, {
      type: "doughnut",
      // The data for our dataset
      data: {
        labels: [],
        datasets: [
          {
            label: "Sum of all classifications",
            backgroundColor: [],
            borderColor: "#1c243a",
            data: [0],
          },
        ],
      },
      // Configuration options go here
      options: {
        // responsive: false,
        aspectRatio: 1,
        title: {
          display: true,
          fontSize: 16,
          position: "top",
          fontColor: "rgb(0, 200, 200)",
          text: "Unique Jobs By Class For Period",
        },
        legend: {
          display: false,
          position: "bottom",
          labels: {
            fontColor: "rgb(0, 200, 200)",
            fontSize: 18,
          },
        },
      },
    });
    initChartData(myChart);
    myChart.update();
    scaleDoughnutText();

    return function cleanup() {
      myChart.destroy();
      window.removeEventListener("resize", scaleDoughnutText);
    };
  });

  return (
    <div className="DoughnutGraph2 graphBg">
      <span id="grandTotal2">
        <div id="grandTotalLabel2">Total:</div>
        <div>{grandTotal()}</div>
      </span>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default React.memo(DoughnutGraph);
