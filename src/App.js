import React, { Component } from 'react';
import './App.css';
import LineGraph from './Components/LineGraph/LineGraph';
import TotalLineGraph from './Components/TotalLineGraph/TotalLineGraph';
import DoughnutGraph from './Components/DoughnutGraph/DoughnutGraph';
import ColorLegend from './Components/ColorLegend/ColorLegend';
import StartEndDates from './Components/StartEndDates/StartEndDates';
import ClassificationPicker from './Components/ClassificationPicker/ClassificationPicker';
import CallCard from './Components/CallCard/CallCard';

class App extends Component {
  constructor() {
    super();
    this.state = {      
      datasets: {},
      start: "2020-12-05",
      end: "2020-12-31",      
      colors: [],           
    }
  }

  handlePickerSize = () => {    
    const picker = document.querySelector('.ClassificationPicker');
    const currentHeight = picker.offsetHeight;
    if (currentHeight > 32) {
      picker.style.height = "32px"
    } else {
      picker.style.height = "610px"
    }
  }

  onDatePick = (selectedDates, dateStr, instance) => {
    // this might be a less side effect-y way
    // to get the values returned from the date pickers
    // pass this in to the picker component
    // the picker onChange hook will pass to it
    // 3 arguments
    // selectedDates, dateStr, instance    
  }

  onButtonSubmit = () => {    
    const start = document.querySelector('#startPicker').value;
    const end = document.querySelector('#endPicker').value;

    //need to validate date inputs
    // convert to date objects and compare to make sure end is later than start
    if (new Date(start) > new Date(end) || start.length === 0 || end.length === 0) {
      return alert("Invalid date input");
    }

    this.setState({start, end})

    const checkboxes = document.querySelectorAll('.ClassificationPickerCheckbox');
    let clicked = [];
    checkboxes.forEach(box => {      
      if (box.checked) clicked.push(box.value);
    });
    if (clicked.length === 0) clicked = ["JW", "AW"];
    console.log(clicked);
    this.getData(clicked, start, end);
    setTimeout(this.handlePickerSize,500);       
  }

  generateRandomColors = () => {
    const random = () => {
        const num = Math.floor(Math.random() * (350 - 50) + 50);
        return num > 255 ? 255 : num;           
    } 
      const R = random();
      const G = random();
      const B = random();
      const A = 0.0      
      const lineColor = `rgb(${R}, ${G}, ${B})`;
      const fillColor = `rgb(${G-50}, ${R-50}, ${B-50}, ${A})`;
      return {
        lineColor,
        fillColor
      }    
  }

  generateColorArray = () => {    
    const arr = []
    for (let i=0; i < 16; i++) {
      arr.push(this.generateRandomColors());
    }
    return arr;
  }

  /*transform our data into something like this:
    {
      Dates: [2020-12-15, 2020-12-16, 2020-12-17],
      JW: [5, 2, 8],
      AW: [2, 10, 7],
      //etc, for all classes that may be returned from DB
    }
  */
  prepareDatasets = (response) => {    
    const keys = Object.keys(response[0]);       
    const datasets = {};
    keys.forEach(key => datasets[key] = []);
    response.forEach(obj => {
      for (let key in obj) {
        datasets[key].push(obj[key]);
      }
    })
    return datasets;       
  }

  getData = (clicked, start, end) => {
    fetch('http://127.0.0.1:3000/members_needed_by_date', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        "start": start || "2020-12-04",
        "end": end || "2020-12-31",
        "member_class": clicked
      })
    })
    .then(response => response.json())   
    .then(response => {
      // console.log("this came back from the API: ", response);         
     return this.prepareDatasets(response);
    })   
    .then(preparedDatasets => {
      // console.log("prepareDatasets returned: ", preparedDatasets);
      this.setState({datasets: {}})
      this.setState(Object.assign(this.state.datasets, preparedDatasets));     
    })
    .catch(err => console.log("Fetch failed ", err))
  }

  componentDidMount() {
    this.setState({colors: this.generateColorArray()})
    this.getData(); 
  }

  render() {
    
    console.log("logging State from App.js :", this.state);        
    return (
      <div className="App">
        <div className="layoutMaster">      
          <h1>IBEW LOCAL 353 JOB CALLS DATABASE</h1>          
          <ClassificationPicker
            colors={this.state.colors}
            onCheckBoxClick={this.onCheckBoxClick}
            onButtonSubmit={this.onButtonSubmit}
            onDatePick={this.onDatePick}
            handlePickerSize={this.handlePickerSize}
          />
          <div className="graphMaster">
            <StartEndDates 
              start={this.state.start}
              end={this.state.end}
            />
            <div className="multiGraphContainer">              
              <LineGraph 
                datasets={this.state.datasets}                
                colors={this.state.colors} 
              />
            </div>              
            <div className="multiGraphContainer">
              <TotalLineGraph
                datasets={this.state.datasets} 
              />      
              <DoughnutGraph
                datasets={this.state.datasets}
                colors={this.state.colors} 
              />
            </div>
            <ColorLegend datasets={this.state.datasets} colors={this.state.colors} /> 
          </div>
          <CallCard />
        </div>        
      </div>
    );
  }  
}

export default App;
