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
	      pointRadius: 5,
	      data: datasets[key]
	   	}
	   	myChart.data.datasets.push(chartLine);
		}
	}

	useEffect(()=> {
		/*init graph instance...this runs every render??*/
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
            fontSize: 16,
            position: 'top',
            fontColor: "rgb(0, 200, 200)",
            text: `Members Needed by Classification`
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
	        		display: true,
	        		color: 'rgb(0, 50, 50)',
	        		lineWidth: 1
        		},
            ticks: {
                fontColor: "rgb(0, 200, 200)",
                fontSize: 12,
                stepSize: 1,
                beginAtZero: true
            }
          }],
          xAxes: [{
          	gridLines: {
	        		display: true,
	        		color: 'rgb(0, 50, 100)',
	        		lineWidth: 1
        		},
	          ticks: {
	              fontColor: "rgb(0, 200, 200)",
	              fontSize: 12,
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

	let waitingOpacity = 0;
	let scale = 1;
	const loadingOverlay = document.querySelector('.loadingFlex');
	if (datasets && Object.keys(datasets).length === 0) {
		waitingOpacity = 1;
		scale = 'scale(1)';
		if (loadingOverlay) loadingOverlay.style.setProperty('display', 'flex');
	} else {
		waitingOpacity = 0;
		scale = 'scale(0)';
		if (loadingOverlay) {
			setTimeout(()=> {
				loadingOverlay.style.setProperty('display', 'none');
			},1000);
		}
	}

	return (
		<div className='loadingRef'>
			<div className='loadingFlex' style={{display: 'flex'}}>
				<h1 className='noData' style={{opacity: waitingOpacity, transform: scale}}>Fetching Data</h1>
			</div>
			<div className='graphBg LineGraph'>
				<canvas ref={ canvasRef } />
			</div>
		</div>
	);
}

export default LineGraph