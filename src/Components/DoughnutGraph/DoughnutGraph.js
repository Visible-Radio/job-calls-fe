import React, { useEffect, useRef} from 'react';
import Chart from 'chart.js';

const DoughnutGraph = ({ datasets, colors }) => {
	const canvasRef = useRef();

	const scaleDoughnutText = () => {
		const doughnutGraphElement = document.querySelector('.DoughnutGraph');
		const grandTotalElement = document.querySelector('#grandTotal');
		const width = doughnutGraphElement.offsetWidth;
		grandTotalElement.style.fontSize = `${width/10}px`
		const textWidth = grandTotalElement.offsetWidth;
		const left = (width/2) - (textWidth/2);
		grandTotalElement.style.left = `${left}px`;
	}

  const initChartData = (myChart) => {
  	myChart.data.datasets[0].data = [];
  	myChart.data.labels = [];
  	myChart.data.datasets[0].backgroundColor = [];

  	for (let key in datasets) {
			if (key === "Date" || key === "Total") continue;
      myChart.data.labels.push(key);
      const reduced = datasets[key].reduce((acc, element) =>	acc += Number(element),0);
      myChart.data.datasets[0].data.push(reduced);
      myChart.data.datasets[0].backgroundColor.push(colors[key]);
  	}
  }

  const grandTotal = () => {
  	const grandTotal = datasets?.Total?.reduce((acc, element) =>	acc += Number(element),0);
  	return grandTotal
  }

	useEffect(()=> {
		window.addEventListener('resize', scaleDoughnutText);

		const myChart = new Chart(canvasRef.current, {
			type: 'doughnut',
			// The data for our dataset
			data: {
				labels: [],
				datasets: [
					{
						label: "Sum of all classifications",
						backgroundColor: [],
						borderColor: '#1c243a',
						data: [0]
					}
				]
			},
			// Configuration options go here
			options: {
				// responsive: false,
				aspectRatio: 1,
				title: {
						display: true,
						fontSize: 16,
						position: 'top',
						fontColor: "rgb(0, 250, 200)",
						text: 'Classification Totals for Period'
				},
				legend: {
					display: false,
					position: 'bottom',
					labels: {
							fontColor: "rgb(150, 120, 255)",
							fontSize: 18
					}
				}
			}
		});
		initChartData(myChart);
		myChart.update();
		scaleDoughnutText();

		return function cleanup() {
			myChart.destroy();
		};
	})

		return (
				<div className="DoughnutGraph graphBg" >
					<span id="grandTotal"><div id="grandTotalLabel">Total:</div><div>{grandTotal()}</div></span>
					<canvas ref={ canvasRef } />
				</div>
			);
}

export default DoughnutGraph