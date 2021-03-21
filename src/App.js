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
import findDuplicates from './utils/findDuplicates';
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

  const filteredCalls = callCardData
    .filter(call => call.summary.toLowerCase().includes(searchField.toLowerCase()));

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
            start={start}
            end={end}
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
