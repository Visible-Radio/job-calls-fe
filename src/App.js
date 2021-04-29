import { useEffect, useMemo, useState } from "react";
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
import { colors } from "./config";
import { createDate } from "./utils/createDate";
import findUniqueTotals from "./utils/findUniqueTotals";
import validateDateInput from "./utils/validateDateInput";
import BottomDrawer from "./Components/BottomDrawer/BottomDrawer";
import CallsViewGrid from "./Components/LayoutComponents/CallsViewGrid";
import ExploreRouteGrid from "./Components/LayoutComponents/ExploreRouteGrid";
import GraphViewGrid from "./Components/LayoutComponents/GraphViewGrid";
import GraphViewSubGrid from "./Components/LayoutComponents/GraphViewSubGrid";
import MultiSelect from "./Components/MultiSelect/MultiSelect";

const ExploreRoute = () => {
  const [chartData, setChartData] = useState({});
  const [callCardData, setCallCardData] = useState([]);
  const [start, setStart] = useState(createDate(0, -1, 0));
  const [end, setEnd] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState("All Companies");
  const [companiesOnRecord, setCompaniesOnRecord] = useState();
  const [searchField, setSearchField] = useState("");
  const [view, setView] = useState("Charts");
  const [pickerIsOpen, setPickerIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    handleFetch(selectedClasses, start, end, selectedCompanies).then((data) => {
      if (data === 1) return alert("failed to fetch from API");
      setCallCardData(data.callCardData);
      setChartData(data.chartData);
      setCompaniesOnRecord(data.companies);
      setLoading(false);
    });
  }, [selectedClasses, start, end, selectedCompanies]);

  const onButtonSubmit = (event) => {
    const [start, end] = JSON.parse(event.target.dataset.range);
    if (!validateDateInput(start, end)) return;
    setStart(start);
    setEnd(end);
    setSelectedClasses(JSON.parse(event.target.dataset.classes));
    setSelectedCompanies(JSON.parse(event.target.dataset.company));
    if (view === "Charts") setTimeout(setPickerIsOpen(!pickerIsOpen), 500);
  };

  const togglePicker = () => {
    setPickerIsOpen(!pickerIsOpen);
  };

  const onToggleView = () => {
    setView(view === "Charts" ? "Calls" : "Charts");
    setSearchField("");
  };

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredCalls = useMemo(
    () =>
      callCardData.filter((call) =>
        call.summary.toLowerCase().includes(searchField.toLowerCase())
      ),
    [callCardData, searchField]
  );

  const { uniqueJobsByClassification, callsById, count } = useMemo(
    () => findUniqueTotals(filteredCalls),
    [filteredCalls]
  );

  return (
    <>
      <div style={{width: '100%'}}>
        <MultiSelect />
      </div>
      <Loader datasets={chartData} loading={loading}>
        <ExploreRouteGrid>
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
            <GraphViewGrid>
              <GraphViewSubGrid>
                <DoughnutGraphUniqueJobs
                  datasets={uniqueJobsByClassification}
                  colors={colors}
                />
              </GraphViewSubGrid>
              <LineGraph datasets={chartData} colors={colors} />
              <ColorLegend datasets={chartData} colors={colors} />
              <TotalLineGraph datasets={chartData} />
            </GraphViewGrid>
          )}

          {view === "Calls" && (
            <CallsViewGrid>
              <SearchBox
                searchChange={onSearchChange}
                totalCalls={filteredCalls.length}
                uniqueCalls={count}
              />
              <BottomDrawer>
                <DoughnutGraphUniqueJobs
                  datasets={uniqueJobsByClassification}
                  colors={colors}
                />
              </BottomDrawer>
              <CallCardList colors={colors} callsById={callsById} searchField={searchField} />
            </CallsViewGrid>
          )}
        </ExploreRouteGrid>
      </Loader>
    </>
  );
};

export default ExploreRoute;
