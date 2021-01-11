import React, { Component } from 'react';
import Chart from 'chart.js';

class DoughnutGraph extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}
	
  initChartData = () => {
  	let index = 0;  	
  	for (let key in this.props.datasets) {  	  			
			if (key === "Date" || key === "Total") continue;			
      this.myChart.data.labels.push(key);
      const reduced = this.props.datasets[key].reduce((acc, element) =>	acc += Number(element),0);
      this.myChart.data.datasets[0].data.push(reduced);
      this.myChart.data.datasets[0].backgroundColor.push(this.props.colors[index].lineColor);       
      index++;
  	}
  }	   	

	componentDidUpdate() {				
		this.initChartData();		
		this.myChart.update();
  }  

	componentDidMount() {

		this.myChart = new Chart(this.canvasRef.current, {
			type: 'doughnut',			
			// The data for our dataset
	    data: {
        labels: [],
        datasets: [
        	{
		        label: "Sum of all classifications",		      			      
			      backgroundColor: [], 
			      borderColor: '#1c243a',			      
			      data: []
		    	}
        ]
	    },

	    // Configuration options go here
	    options: {
	    	aspectRatio: 1,
	    	title: {
            display: true,
            fontSize: 12,
            position: 'top',
            fontColor: "rgb(0, 200, 200)",
            text: 'Total members needed by classification for period'
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
	}

	render() {			
		return (						
				<div className="DoughnutGraph graphBg" >
					<canvas ref={ this.canvasRef } />
				</div>						
			);
	}
}

export default DoughnutGraph