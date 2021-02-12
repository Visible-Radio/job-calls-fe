import React, { Component } from 'react';
import Chart from 'chart.js';

class LineGraph extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	generateLines = () => {
	//programatically generate the data object for each line
	this.myChart.data.datasets.length = 0;

		for (let key in this.props?.datasets) {
			if (key === "Date" || key === "Total") continue;
			const chartLine = {
	      label: key,
	      lineTension: 0.3,
	      backgroundColor: 'rgba(1,1,1,0)' ,
	      borderColor: this.props?.colors[key],
	      borderWidth: 2,
	      pointRadius: 5,
	      data: this.props?.datasets[key]
	   	}
	   	this.myChart.data.datasets.push(chartLine);

		}
	}

	componentDidUpdate() {
		this.myChart.data.datasets.length = 0;
		this.generateLines();
    this.myChart.data.labels = this.props?.datasets?.Date;
    this.myChart.update();
  }

	componentDidMount() {
		this.myChart = new Chart(this.canvasRef.current, {
			type: 'line',
			// The data for our dataset
	    data: {
        labels: this.props?.datasets?.Date,
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
		});
	}

	render() {
		let waitingOpacity = 0;
		if (this.props.datasets && Object.keys(this.props.datasets).length === 0) {
			waitingOpacity = 1;
		} else {
			waitingOpacity = 0;
		}
		return (
			<div className='loadingRef'>
				<h1 className='noData' style={{opacity: waitingOpacity,}}>Waiting for Database</h1>
				<div className='graphBg LineGraph'>
					<canvas ref={ this.canvasRef } />
				</div>
			</div>
			);
	}

}

export default LineGraph