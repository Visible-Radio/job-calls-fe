import React, { useEffect, useState } from "react";
import "./App.css";
import LineGraph from "./Components/LineGraph/LineGraph";
import TotalLineGraph from "./Components/TotalLineGraph/TotalLineGraph";
import DoughnutGraphUniqueJobs from "./Components/DoughnutGraph/DoughnutGraphUniqueJobs";
import ColorLegend from "./Components/ColorLegend/ColorLegend";
import StartEndDates from "./Components/StartEndDates/StartEndDates";
import SearchBox from "./Components/SearchBox/SearchBox";
import ClassificationPicker from "./Components/ClassificationPicker/ClassificationPicker";
import CallCardList from "./Components/CallCardList/CallCardList";
import Loader from "./Components/Loader/Loader";
import handleFetch from "./utils/HandleFetch";
import findDuplicates from "./utils/findDuplicates";
import { colors } from "./config";
import { createDate } from "./utils/createDate";
import findUniqueTotals from "./utils/findUniqueTotals";
import validateDateInput from "./utils/validateDateInput";

const App = () => {
  const [chartData, setChartData] = useState({});
  const [callCardData, setCallCardData] = useState([]);
  const [start, setStart] = useState(createDate(0, -1, 0));
  const [end, setEnd] = useState(() => {
    let start = new Date();
    return start.toISOString().slice(0, 10);
  });
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState("All Companies");
  const [companiesOnRecord, setCompaniesOnRecord] = useState();
  const [searchField, setSearchField] = useState("");
  const [view, setView] = useState("Charts");
  const [pickerIsOpen, setPickerIsOpen] = useState(true);

  const togglePicker = (event) => {
    setPickerIsOpen(!pickerIsOpen);
  };

  const toggleDoughnut = () => {
    const drawer = document.querySelector(".mobileChartDrawer");
    drawer.classList.toggle("hideDoughnutOnMobile");
  };

  const onToggleView = () => {
    if (view === "Charts") {
      setView("Calls");
    } else if (view === "Calls") {
      setView("Charts");
    }
  };

  const onButtonSubmit = (event) => {
    const [ start, end ] = JSON.parse(event.target.dataset.range)
    if (!validateDateInput(start, end)) return;
    setStart(start);
    setEnd(end);
    setSelectedClasses(JSON.parse(event.target.dataset.classes));
    setSelectedCompanies(JSON.parse(event.target.dataset.company));
    setCallCardData([]);
    setChartData({});
    if (view === "Charts") setTimeout(setPickerIsOpen(!pickerIsOpen), 500);
  };

  useEffect(() => {
    handleFetch(selectedClasses, start, end, selectedCompanies).then((data) => {
      if (data === 1) {
        console.log("failed to fetch from API");
        return;
      }
      setCallCardData(data.callCardData);
      setChartData(data.chartData);
      setCompaniesOnRecord(data.companies);
    });
  }, [selectedClasses, start, end, selectedCompanies]);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredCalls = callCardData.filter((call) =>
    call.summary.toLowerCase().includes(searchField.toLowerCase())
  );

  const staleCalls = findDuplicates(filteredCalls);
  const { uniqueJobsByClassification } = findUniqueTotals(callCardData);

  return (
    <div className="App">
      {console.log('rendering')}
      <Loader datasets={chartData}>
        <div className="layoutMaster">
          <StartEndDates start={start} end={end} company={selectedCompanies} />
          <ClassificationPicker
            companiesOnRecord={companiesOnRecord}
            onButtonSubmit={onButtonSubmit}
            onToggleView={onToggleView}
            togglePicker={togglePicker}
            view={view}
            pickerIsOpen={pickerIsOpen}
            start={start}
            end={end}
          />

          {view === "Charts" && (
            <div className="graphGrid">
              <div className="leftSubGrid">
                <DoughnutGraphUniqueJobs
                  datasets={uniqueJobsByClassification}
                  colors={colors}
                />
              </div>
              <LineGraph datasets={chartData} colors={colors} />
              <ColorLegend datasets={chartData} colors={colors} />
              <TotalLineGraph datasets={chartData} />
            </div>
          )}

          {view === "Calls" && (
            <div className="callGrid">
              <SearchBox
                searchChange={onSearchChange}
                count={filteredCalls.length}
                staleCalls={staleCalls}
              />
              <div className="leftSubGrid mobileChartDrawer hideDoughnutOnMobile">
                <button id="doughnutHandle" onClick={toggleDoughnut}>
                  ☰
                </button>
                <DoughnutGraphUniqueJobs
                  datasets={uniqueJobsByClassification}
                  colors={colors}
                />
              </div>
              <CallCardList
                filteredCalls={filteredCalls}
                colors={colors}
                staleCalls={staleCalls}
              />
            </div>
          )}
        </div>
        {/* end of layout master */}
      </Loader>
    </div> /* end of App */
  );
};

export default App;
