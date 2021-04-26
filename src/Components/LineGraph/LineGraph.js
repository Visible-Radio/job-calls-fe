import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const LineGraph = ({ datasets, colors }) => {
	const canvasRef = useRef();

	const generateLines = (myChart) => {
		//programatically generate the data object for each line
		myChart.data.datasets.length = 0;

		for (let key in datasets) {
			if (key === "Date" || key === "Total") continue;
			const chartLine = {
	      label: key,
	      lineTension: 0.3,
	      backgroundColor: 'rgba(1,1,1,0)' ,
	      borderColor: colors[key],
	      borderWidth: 2,
	      pointRadius: 2,
	      data: datasets[key]
	   	}
	   	myChart.data.datasets.push(chartLine);
		}
	}

	useEffect(()=> {
		const myChart = new Chart(canvasRef.current, {
			type: 'line',
			// The data for our dataset
	    data: {
        labels: datasets?.Date,
        datasets: [] // chartLines get pushed into here
	    },
	    // Configuration options go here
	    options: {
	    	title: {
            display: true,
            fontSize: 15,
            position: 'top',
            fontColor: "rgb(0, 250, 200)",
            text: `Members Requested by Classification for Each Day`
        },
	    	legend: {
	    		display: false,
          labels: {
              fontColor: "rgb(0, 120, 255)",
              fontSize: 18
          }
        },
        scales: {
          yAxes: [{
          	gridLines: {
	        		display: false,
	        		color: 'rgba(0, 50, 50,0.25)',
	        		lineWidth: 1
        		},
            ticks: {
                fontColor: "rgb(0, 250, 200)",
                fontSize: 10,
                stepSize: 5,
                beginAtZero: true
            }
          }],
          xAxes: [{
          	gridLines: {
	        		display: false,
	        		color: 'rgba(0, 50, 100,0.25)',
	        		lineWidth: 1
        		},
	          ticks: {
	              fontColor: "rgb(0, 250, 200)",
	              fontSize: 10,
	              stepSize: 1,
	              beginAtZero: true
	          }
          }]
        }
	    }
		});/*end of init graph instance*/

		generateLines(myChart);
    myChart.data.labels = datasets?.Date;
    myChart.update();

		return function cleanup() {
			myChart.destroy();
		};
	});

	return (
			<div className='graphBg LineGraph'>
				<canvas ref={ canvasRef } />
			</div>
	);
}

export default React.memo(LineGraph);