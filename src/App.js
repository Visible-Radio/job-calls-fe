import React, { Component } from 'react';
import './App.css';
import LineGraph from './Components/LineGraph/LineGraph';
import TotalLineGraph from './Components/TotalLineGraph/TotalLineGraph';
import Marquee from './Components/Marquee/Marquee';
import DoughnutGraph from './Components/DoughnutGraph/DoughnutGraph';
import ColorLegend from './Components/ColorLegend/ColorLegend';
import StartEndDates from './Components/StartEndDates/StartEndDates';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // rawFromAPI: [],
      datasets: {},
      start: "2020-12-01",
      end: "2020-12-31",
      dates: [],
      total: [],
      colors: []
    }
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

  componentDidMount() {
    this.setState({colors: this.generateColorArray()})        
    fetch('http://127.0.0.1:3000/members_needed_by_date', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        "start": this.state.start,
        "end": this.state.end,
        // "member_class": ["JW", "AW", "JHW"]
      })
    })
   .then(response => response.json())   
   .then(response => {    
    //this.setState(Object.assign(this.state.rawFromAPI, response))
    return this.prepareDatasets(response);
   })   
   .then(preparedDatasets => {    
    this.setState({total: preparedDatasets.Total, dates: preparedDatasets.Date})    
    return preparedDatasets;
   })
   .then(preparedDatasets => {
    this.setState(Object.assign(this.state.datasets, preparedDatasets))    
   })
   .catch(err => console.log("Fetch failed ", err))
    
  }

  render() {        
    return (

      <div className="App">
      <div className="layoutMaster">      
        <h1>IBEW LOCAL 353 JOB CALLS DATABASE</h1>
          <div className="graphMaster">
            <StartEndDates 
              start={this.state.start}
              end={this.state.end}
            />
            <div className="multiGraphContainer">              
              <LineGraph 
                datasets={this.state.datasets}
                start={this.state.start}
                end={this.state.end}
                colors={this.state.colors} 
              />
            </div>              
            <div className="multiGraphContainer">
              <TotalLineGraph 
                total={this.state.total}
                dates={this.state.dates}
                start={this.state.start}
                end={this.state.end}
              />      
              <DoughnutGraph
                datasets={this.state.datasets}
                colors={this.state.colors} 
              />
            </div>
            <ColorLegend datasets={this.state.datasets} colors={this.state.colors} /> 
          </div>
        </div>
      </div>
    );
  }  
}

export default App;
