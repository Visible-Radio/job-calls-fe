import React, { Component } from 'react';
import Chart from 'chart.js';
import './TotalLinegraph.css'

class TotalLineGraph extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}
		
	humanDate = (iso_date_string) => {
		const myString = new Date(iso_date_string).toUTCString();
		return myString.replace(/ \d\d:\d\d:\d\d \w\w\w/, "");
	}

	componentDidUpdate() {				
		this.myChart.data.datasets[0].data = this.props.total;
		this.myChart.data.labels = this.props.dates;       
		this.myChart.update();
  }  

	componentDidMount() {
		this.myChart = new Chart(this.canvasRef.current, {
			type: 'line',			
			// The data for our dataset
	    data: {
        labels: this.props.dates,
        datasets: [
        	{
		        label: "Sum of all classifications",
			      lineTension: 0.3,
			      backgroundColor: 'rgba(0, 50, 100, 0)',
			      borderColor: 'rgb(200, 200, 0)',
			      borderWidth: 2,
			      pointRadius: 5,
			      data: this.props.total
		    	}
        ]
	    },

	    // Configuration options go here
	    options: {
	    	title: {
            display: true,
            fontSize: 16,
            position: 'top',
            fontColor: "rgb(0, 200, 200)",
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
          	// display: false,
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
		return (						
				<div className='graphBg totalLineGraph'>
					<canvas ref={ this.canvasRef } />
				</div>						
			);
	}
}

export default TotalLineGraph