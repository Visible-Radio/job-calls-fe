import React, { Component } from 'react';
import Chart from 'chart.js';

class DoughnutGraph extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	scaleDoughnutText = () => {		
		const doughnutGraphElement = document.querySelector('.DoughnutGraph');
		const grandTotalElement = document.querySelector('#grandTotal');
		const width = doughnutGraphElement.offsetWidth;
		grandTotalElement.style.fontSize = `${width/10}px`
		const textWidth = grandTotalElement.offsetWidth;
		const left = (width/2) - (textWidth/2);
		grandTotalElement.style.left = `${left}px`;		
	}
	
  initChartData = () => {
  	this.myChart.data.datasets[0].data = [];  				
  	this.myChart.data.labels = [];
  	this.myChart.data.datasets[0].backgroundColor = [];
  	  	  	
  	for (let key in this.props.datasets) {  	  			
			if (key === "Date" || key === "Total") continue;			
      this.myChart.data.labels.push(key);
      const reduced = this.props.datasets[key].reduce((acc, element) =>	acc += Number(element),0);
      this.myChart.data.datasets[0].data.push(reduced);
      this.myChart.data.datasets[0].backgroundColor.push(this.props.colors[key]);       
  	}
  }

  grandTotal = () => {
  	const grandTotal = this.props.datasets?.Total?.reduce((acc, element) =>	acc += Number(element),0);
  	return grandTotal
  }  	

	componentDidUpdate() {	
		this.initChartData();		
		this.myChart.update();
		this.scaleDoughnutText();			
  }  

	componentDidMount() {		
		window.addEventListener('resize', this.scaleDoughnutText);

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
            fontColor: "rgb(0, 200, 200)",
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
	}

	render() {			
		return (						
				<div className="DoughnutGraph graphBg" >
					<span id="grandTotal"><div id="grandTotalLabel">Total:</div><div>{this.grandTotal()}</div></span>
					<canvas ref={ this.canvasRef } />					
				</div>						
			);
	}
}

export default DoughnutGraph