import React, { Component } from 'react';

class CallCard extends Component {
	constructor(props) {
		super(props);		
	}


getCallSheetData = () => {
  fetch('http://127.0.0.1:3000/', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      "start": "2020-12-04",
      "end": "2020-12-31",	        
    })
  })
  .then(response => response.json())   
  .then(response => {
    console.log("this came back from the API: ", response);
  })
} 


componentDidMount() {
	this.getCallSheetData();
}



	render() {			
		return (						
				<div className="CallCard" >
							<p>Hi there! I'm the call card component</p>			
				</div>						
			);
	}
}

export default CallCard