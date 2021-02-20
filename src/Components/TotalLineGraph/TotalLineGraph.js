import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const TotalLineGraph = ({ datasets }) => {
	const canvasRef = useRef();

	useEffect(() => {
		const myChart = new Chart(canvasRef.current, {
			type: 'line',
			// The data for our dataset
	    data: {
        labels: datasets?.Date,
        datasets: [
        	{
		        label: "Sum of selected classifications",
			      lineTension: 0.3,
			      backgroundColor: 'rgba(0, 50, 100, 0)',
			      borderColor: 'rgb(255, 255, 0)',
			      borderWidth: 2,
			      pointRadius: 2,
			      data: datasets?.Total
		    	}
        ]
	    },
	    // Configuration options go here
	    options: {
	    	title: {
            display: true,
            fontSize: 16,
            position: 'top',
            fontColor: "rgb(0, 250, 200)",
            text: `Total Members Needed`
        },
	    	legend: {
	    		display: false,
          labels: {
              fontColor: "rgb(150, 120, 255)",
              fontSize: 18
          }
        },
        scales: {
          yAxes: [{
          	// display: false,
          	gridLines: {
	        		display: false,
	        		color: 'rgb(0, 50, 50)',
	        		lineWidth: 1
        		},
            ticks: {
                fontColor: "rgb(0, 250, 200)",
                fontSize: 10,
                stepSize: 5,
                beginAtZero: false
            }
          }],
          xAxes: [{
          	// display: false,
          	gridLines: {
          		display: false,
	        		color: 'rgb(0, 50, 100)',
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
		});

		myChart.data.datasets[0].data = datasets?.Total;
		myChart.data.labels = datasets?.Date;
		myChart.update();

		return function cleanup() {
			myChart.destroy();
		};
	})

	return (
			<div className='graphBg totalLineGraph'>
				<canvas ref={ canvasRef } />
			</div>
		);
}

export default TotalLineGraph