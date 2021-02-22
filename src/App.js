//TODOs
/*
refactor for the react chart.js library

layout bug on mobile with classification picker
better layout overall, maybe try out Grid

maybe need to modify the db schema
create a table with columns for companies and company id
join on company id in the main table
might speed up getting the list of companies for the select menu
and also enable more restrictive regex on the inputs for company
  instead of having to support any company name with any
  non-alphanumeric characters, query would just be by numeric id

FEATURES TO ADD:
  highlight text that has been filtered for OR give some better
    indication that the results have been updated for the terms
  replot charts for filtered text results
  pagination for job call card results

*/

import React, { useEffect, useState } from 'react';
import './App.css';
import LineGraph from './Components/LineGraph/LineGraph';
import TotalLineGraph from './Components/TotalLineGraph/TotalLineGraph';
import DoughnutGraph from './Components/DoughnutGraph/DoughnutGraph';
import ColorLegend from './Components/ColorLegend/ColorLegend';
import StartEndDates from './Components/StartEndDates/StartEndDates';
import SearchBox from './Components/SearchBox/SearchBox';
import ClassificationPicker from './Components/ClassificationPicker/ClassificationPicker';
import CallCardList from './Components/CallCardList/CallCardList';
import CompanyRankings from './Components/CompanyRankings/CompanyRankings';
import handleFetch from './utils/HandleFetch';
import { colors } from './config';

const App = () => {
  const [chartData, setChartData] = useState({});
  const [callCardData, setCallCardData] = useState([]);
  const [start, setStart] = useState('2020-12-05');
  const [end, setEnd] = useState('2021-01-30');
  const [clicked, setClicked] = useState([]);
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState();
  const [searchField, setSearchField] = useState('');
  const [view, setView] = useState('Charts');

  const handlePickerSize = () => {
    const picker = document.querySelector('.ClassificationPicker');
    picker.classList.toggle('close');

  }

  const onToggleView = () => {
    if (view === 'Charts') {
      setView('Calls')
    } else if (view ==="Calls") {
      setView('Charts')
    }
  }

  const onButtonSubmit = () => {
    const start = document.querySelector('#startPicker').value;
    const end = document.querySelector('#endPicker').value;
    // replaced with select menu
    // const company = document.querySelector('#companyInput').value;
    const companySelect = document.querySelector('#companySelect').value;

    // convert to date objects and compare to make sure end is later than start
    if (new Date(start) > new Date(end) || start.length === 0 || end.length === 0) {
      return alert("Invalid date input");
    }
    setStart(start);
    setEnd(end);

    // only permit alphanumeric chars
    const pattern = /^[a-zA-Z0-9 \.\-\(\)\&\\\/]*$/
    if (!pattern.test(companySelect)) {
      return alert("Invalid characters in company input");
    }
    setCompany(companySelect === 'All Companies' ? '' : companySelect);

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
        handleFetch(clicked, start, end, company).then(data => {
        setCallCardData(data.callCardData);
        setChartData(data.chartData);
        setCompanies(data.companies);
      });
   },[clicked, start, end, company]);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  }

  const filteredCalls = callCardData.filter(call => {
    return call.summary.toLowerCase().includes(searchField.toLowerCase());
  })


    return (
      <div className="App">
        <div className="layoutMaster">
          <StartEndDates
            start={start}
            end={end}
            company={company}
          />
          <ClassificationPicker
            companies={companies}
            colors={colors}
            onButtonSubmit={onButtonSubmit}
            onToggleView={onToggleView}
            handlePickerSize={handlePickerSize}
            view = {view}
          />
          {
          (function(){
            if (view === 'Charts') {
              return (
                <div className="graphGrid">
                  <div className="leftSubGrid">
                    <DoughnutGraph datasets={chartData} colors={colors} />
                    <CompanyRankings />
                  </div>
                  <LineGraph datasets={chartData} colors={colors} />
                  <ColorLegend datasets={chartData} colors={colors} />
                  <TotalLineGraph datasets={chartData} />
                </div>
              )
            } else if (view === "Calls") {
              return (
                <div className="callGrid">
                  {/* <div className="leftSubGrid">
                    <DoughnutGraph datasets={chartData} colors={colors} />
                    <CompanyRankings />
                  </div> */}
                  <SearchBox
                    searchChange={onSearchChange}
                    count={filteredCalls.length}
                  />
                  <CallCardList
                    filteredCalls={filteredCalls}
                    colors={colors}
                  />
                </div>
              )
            }
          }())
          }
        </div>{/* end of layout master */}
      </div>
    );
}

export default App;
