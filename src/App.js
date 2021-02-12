//TODOs
/*
some kind of loading indicator when waiting for data
clear charts of old data when new data has been requested

Why does the filter input cause the line graph to re-render? fix this

refactor chart compondents with hooks
refactor for the react chart.js library

layout bug on mobile with classification picker
better layout overall, maybe try out Grid

FEATURES TO ADD:
  highlight text that has been filtered for OR give some better
    indication that the results have been updated for the terms
  replot charts for filtered text results
  pagination for job call card results
  select menu for companies
    might need to add an endpoint to do this efficiently

*/

import React, { useEffect, useState } from 'react';
import './App.css';
import LineGraph from './Components/LineGraph/LineGraph';
import TotalLineGraph from './Components/TotalLineGraph/TotalLineGraph';
import DoughnutGraph from './Components/DoughnutGraph/DoughnutGraph';
import ColorLegend from './Components/ColorLegend/ColorLegend';
import StartEndDates from './Components/StartEndDates/StartEndDates';
import ClassificationPicker from './Components/ClassificationPicker/ClassificationPicker';
import CallCardList from './Components/CallCardList/CallCardList';
import handleFetch from './utils/HandleFetch';
import { colors } from './config';

const App = () => {
  const [chartData, setChartData] = useState({});
  const [callCardData, setCallCardData] = useState([]);
  const [start, setStart] = useState('2020-12-05');
  const [end, setEnd] = useState('2021-01-30');
  const [clicked, setClicked] = useState([]);
  const [company, setCompany] = useState('');

  const handlePickerSize = () => {
    const picker = document.querySelector('.ClassificationPicker');
    const currentHeight = picker.offsetHeight;
    if (currentHeight > 34) {
      picker.style.height = "34px"
    } else {
      picker.style.height = "650px"
    }
  }

  const onButtonSubmit = () => {
    const start = document.querySelector('#startPicker').value;
    const end = document.querySelector('#endPicker').value;
    const company = document.querySelector('#companyInput').value;

    // convert to date objects and compare to make sure end is later than start
    if (new Date(start) > new Date(end) || start.length === 0 || end.length === 0) {
      return alert("Invalid date input");
    }
    setStart(start);
    setEnd(end);
    setCompany(company);

    // only permit alphanumeric chars
    const pattern = /^[a-zA-Z0-9 ]*$/
    if (!pattern.test(company)) {
      return alert("Invalid characters in company input");
    }

    const checkboxes = document.querySelectorAll('.ClassificationPickerCheckbox');

    let checked = [];
    checkboxes.forEach(box => {
      if (box.checked) checked.push(box.value);
    });
    setClicked(checked);
    setCallCardData([]);
    setChartData({});
    setTimeout(handlePickerSize,500);
  }

  useEffect(() => {
      console.log(clicked, start, end, company);
      handleFetch(clicked, start, end, company).then(data => {
        setCallCardData(data.callCardData);
        setChartData(data.chartData);
      });
   },[clicked, start, end, company]);

    return (
      <div className="App">
        <div className="layoutMaster">
        <div id="header">
          <h1>IBEW LOCAL 353</h1>
          <h1>JOB CALLS DATABASE</h1>
        </div>
          <ClassificationPicker
            colors={colors}
            // onCheckBoxClick={onCheckBoxClick}
            // onDatePick={onDatePick}
            onButtonSubmit={onButtonSubmit}
            handlePickerSize={handlePickerSize}
          />
          <div className="graphMaster">
            <StartEndDates
              start={start}
              end={end}
              company={company}
            />
            <div className="multiGraphContainer">
              <LineGraph
                datasets={chartData}
                colors={colors}
              />
            </div>
            <div className="multiGraphContainer">
              <TotalLineGraph
                datasets={chartData}
              />
              <DoughnutGraph
                datasets={chartData}
                colors={colors}
              />
            </div>
            <ColorLegend datasets={chartData} colors={colors} />
          </div>
          <CallCardList
            callCardData={callCardData}
            colors={colors}
          />
        </div>
      </div>
    );
}

export default App;
