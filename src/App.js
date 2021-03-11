//TODOs
/*
refactor for the react chart.js library


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
import Loader from './Components/Loader/Loader';
import handleFetch from './utils/HandleFetch';
import { colors } from './config';
import { createDate } from './utils/createDate';

const App = () => {
  const [chartData, setChartData] = useState({});
  const [callCardData, setCallCardData] = useState([]);
  const [start, setStart] = useState(createDate(0, -1, 0));
  const [end, setEnd] = useState(() => {
    let start = new Date();
    return start.toISOString().slice(0, 10);
  });
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
    const companySelect = document.querySelector('#companySelect').value;

    // convert to date objects and compare to make sure end is later than start
    if (new Date(start) > new Date(end) || start.length === 0 || end.length === 0) {
      return alert("Invalid date input");
    }
    setStart(start);
    setEnd(end);

    // only permit alphanumeric chars
    const pattern = /^[a-zA-Z0-9 .\-()&\\/]*$/
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
    if (view === 'Charts') setTimeout(handlePickerSize,500);
  }

  useEffect(() => {
    handleFetch(clicked, start, end, company).then(data => {
      if (data === 1) {
        console.log('failed to fetch from API');
        return;
      };
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

  function findDuplicates(callSheet) {
    // console.log(callSheet);
    //can't modify callSheet as it is a reference to callCardData

    /* move through the callCardData
    store the first union_call_id
    check it against every other call in the array of call objects
    on the first duplicate found, start a new duplicate object
    insert the company, dates and the indicies of callCardData where they were found

    on the next pass don't check the indexes we've already found duplicates at
    */

    let duplicates = {};
    // array of indicies not to check since we've already found dupes there
    let found = [];
    let totalDuplicateMembers = 0;

    for (let i = 0; i < callSheet.length; i++) {
      if (found.includes(i)) continue;
      let current = callSheet[i].union_call_id;

      for (let j = i + 1; j < callSheet.length; j++) {
        if (callSheet[j].union_call_id === current) {
          if (!duplicates[current]) {
            // start a new duplicate object
            duplicates[current] = {
              company: callSheet[j].company,
              duplicate_dates: [],
              duplicate_indicies: [],
              duplicate_members: callSheet[j].members_needed,
            }
            duplicates[current]
              .duplicate_dates
              .push(callSheet[i].call_date_from_html, callSheet[j].call_date_from_html);
            duplicates[current]
              .duplicate_indicies
              .push(i, j);
            found.push(j);
          } else {
            // push our values into the exisiting duplicate object
            duplicates[current]
              .duplicate_dates
              .push(callSheet[j].call_date_from_html);
            duplicates[current]
              .duplicate_indicies
              .push(j);
            duplicates[current]
              .duplicate_members
              += callSheet[j].members_needed;
            totalDuplicateMembers += callSheet[j].members_needed;
            found.push(j);
          }
        }
      }
    }
    return ({
      duplicates,
      found,
      count: found.length,
      totalDuplicateMembers
    });
  }
  const staleCalls = findDuplicates(filteredCalls);

  return (
    <div className="App">
      <Loader datasets={chartData}>
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
                    {/* <CompanyRankings /> */}
                  </div>
                  <LineGraph datasets={chartData} colors={colors} />
                  <ColorLegend datasets={chartData} colors={colors} />
                  <TotalLineGraph datasets={chartData} />
                </div>
              )
            } else if (view === "Calls") {
              return (
                <div className="callGrid">
                  <SearchBox
                    searchChange={onSearchChange}
                    count={filteredCalls.length}
                    staleCalls={staleCalls}
                  />
                  <div className="leftSubGrid">
                    <DoughnutGraph datasets={chartData} colors={colors} />
                  </div>
                  <CallCardList
                    filteredCalls={filteredCalls}
                    colors={colors}
                    staleCalls={staleCalls}
                  />
                </div>
              )
            }
          }())
          }
        </div>{/* end of layout master */}
      </Loader>
    </div> /* end of App */
  );
}

export default App;
