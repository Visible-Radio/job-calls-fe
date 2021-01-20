import React, { Component } from 'react';
import './App.css';
import LineGraph from './Components/LineGraph/LineGraph';
import TotalLineGraph from './Components/TotalLineGraph/TotalLineGraph';
import DoughnutGraph from './Components/DoughnutGraph/DoughnutGraph';
import ColorLegend from './Components/ColorLegend/ColorLegend';
import StartEndDates from './Components/StartEndDates/StartEndDates';
import ClassificationPicker from './Components/ClassificationPicker/ClassificationPicker';
import CallCardList from './Components/CallCardList/CallCardList';
// import SearchBox from './Components/SearchBox/SearchBox';

class App extends Component {
  constructor() {
    super();
    this.state = {      
      datasets: {},
      start: "2020-12-05",
      end: "2020-12-31",      
      colors: [],
      callCardData: [],
      searchfield: ""           
    }
  }

  colors = {
    JW: "#fa5336",
    AW: "#e91e63",
    JHW: "#ff11ff",
    AHW: "#673ab7",
    RJW: "#0055ff",
    JL: "#2196f3",
    AL: "#00bcd4",
    TEC1: "#af9800",
    TEC2: "#ff9800",
    TEC3: "#4caf50",
    TEC4: "#cddc39",
    ATEC: "#004d40",
    CI: "#607d8b",
    ETN: "#424242",
    JCS: "#9e9e9e",
    U: "#795548",
  }

  handlePickerSize = () => {    
    const picker = document.querySelector('.ClassificationPicker');
    const currentHeight = picker.offsetHeight;
    if (currentHeight > 32) {
      picker.style.height = "32px"
    } else {
      picker.style.height = "650px"
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
    const company = document.querySelector('#companyInput').value;   

    // validate date inputs
    // convert to date objects and compare to make sure end is later than start
    if (new Date(start) > new Date(end) || start.length === 0 || end.length === 0) {
      return alert("Invalid date input");
    }
    this.setState({start, end})

    // validate company input
    // only permit alphanumeric chars    
    const pattern = /^[a-zA-Z0-9 ]*$/
    if (!pattern.test(company)) {      
      return alert("Invalid characters in company input");
    }

    const checkboxes = document.querySelectorAll('.ClassificationPickerCheckbox');
    let clicked = [];
    checkboxes.forEach(box => {      
      if (box.checked) clicked.push(box.value);
    });
    // if (clicked.length === 0) clicked = ["JW", "AW"];    
    this.getData(clicked, start, end, company);
    this.getCallSheetData(clicked, start, end, company);
    setTimeout(this.handlePickerSize,500);       
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });   
  }  
  
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

  getData = (clicked, start, end, company) => {
    const body = {
      "start": start || "2020-12-04",
      "end": end || "2020-12-31",
      // "member_class": clicked,        
    }
    if (clicked?.length) {      
      body.member_class = clicked;
    }

    if (company?.length) {      
      body.company = company;
    }

    fetch('http://127.0.0.1:3000/members_needed_by_date', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(body)
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

  getCallSheetData = (clicked, start, end, company) => {
    const body = {
      "start": start || "2020-12-04",
      "end": end || "2020-12-31",
      // "member_class": clicked
    }
    if (clicked?.length) {      
      body.member_class = clicked;
    }    
    if (company?.length) {      
      body.company = company;
    }

    fetch('http://127.0.0.1:3000/', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(response => response.json())   
    .then(response => {
      // console.log("here's the stuff: ", response);
      this.setState({callCardData: []})  
      this.setState(Object.assign(this.state.callCardData, response));
    })
  }

  componentDidMount() {    
    this.getData();
    this.getCallSheetData();    
  }

  render() {    
    const { callCardData, searchfield} = this.state;
    const filteredCalls = callCardData.filter(call => {
      return call.summary.toLowerCase().includes(searchfield.toLowerCase());
    })
    return (
      <div className="App">
        <div className="layoutMaster">      
          <h1>IBEW LOCAL 353 JOB CALLS DATABASE</h1>          
          <ClassificationPicker
            colors={this.colors}
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
                colors={this.colors} 
              />
            </div>              
            <div className="multiGraphContainer">
              <TotalLineGraph
                datasets={this.state.datasets} 
              />      
              <DoughnutGraph
                datasets={this.state.datasets}
                colors={this.colors} 
              />
            </div>
            <ColorLegend datasets={this.state.datasets} colors={this.colors} /> 
          </div>
          {/*<SearchBox 
            searchChange={this.onSearchChange}
            count={filteredCalls.length}
          />*/}
          <CallCardList 
            callCardData={filteredCalls}
            colors={this.colors}
            searchChange={this.onSearchChange}            
          />
        </div>        
      </div>
    );
  }  
}

export default App;
