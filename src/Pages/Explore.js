import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import LineGraph from "../Components/LineGraph/LineGraph";
import TotalLineGraph from "../Components/TotalLineGraph/TotalLineGraph";
import DoughnutGraphUniqueJobs from "../Components/DoughnutGraph/DoughnutGraphUniqueJobs";
import ColorLegend from "../Components/ColorLegend/ColorLegend";
import SearchBox from "../Components/SearchBox/SearchBox";
import CallCardList from "../Components/CallCardList/CallCardList";
import Loader from "../Components/Loader/Loader";
import { colors, readableClassification } from "../config";
import { createDate } from "../utils/createDate";
import findUniqueTotals from "../utils/findUniqueTotals";
import validateDateInput from "../utils/validateDateInput";
import { getData, prepareDatasets } from "../utils/getData";
import BottomDrawer from "../Components/BottomDrawer/BottomDrawer";
import CallsViewGrid from "../Components/LayoutComponents/CallsViewGrid";
import ExploreRouteGrid from "../Components/LayoutComponents/ExploreRouteGrid";
import GraphViewGrid from "../Components/LayoutComponents/GraphViewGrid";
import GraphViewSubGrid from "../Components/LayoutComponents/GraphViewSubGrid";
import MultiSelect from "../Components/MultiSelect/MultiSelect";
import QueryBuilder from "../Components/QueryBuilder/QueryBuilder";
import { MenuButtonStyled } from "../Components/ButtonStyled";

const Explore = () => {
  const [chartData, setChartData] = useState({});
  const [callCardData, setCallCardData] = useState([]);
  const [companiesOnRecord, setCompaniesOnRecord] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [view, setView] = useState("Calls");
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState({});
  const [start, setStart] = useState(createDate(-14, 0, 0).toISOString().slice(0, 10));
  const [end, setEnd] = useState(() => new Date().toISOString().slice(0, 10));
  const [multiSelectSelections, setMultiSelectSelections] = useState({
    multiSelectCompanies: [],
    multiSelectClasses: [],
  });

  // const callsURL = "http://localhost:4000/API";
  // const memberTotalsURL = "http://localhost:4000/API/members_needed_byDate/";
  // const companiesURL = "http://localhost:4000/API/companies";
  const callsURL = "https://evening-plateau-74700.herokuapp.com/API";
  const memberTotalsURL = "https://evening-plateau-74700.herokuapp.com/API/members_needed_byDate/";
  const companiesURL = "https://evening-plateau-74700.herokuapp.com/API/companies";


  const UseLoading = (loadingProperty, isLoading) => {
    // keep one loading object with properties for whatever is loading
    setLoading((prevState) => ({
      ...prevState,
      [loadingProperty]: isLoading,
    }));
  };

  useEffect(() => {
    if (companiesOnRecord.length === 0) {
      // get the complete list of companies from db
      getCompanies();
      // get the initial records
      onButtonSubmit();
    }
  });

  const toggleQueryBuilder = () => {
    // toggle the query builder open/closed
    setIsOpen(!isOpen);
  };

  const onSearchChange = (event) => {
    // filter terms for call sheet details search
    setSearchField(event.target.value);
  };

  const onSelectionChange = useCallback(({ id, selection }) => {
    // this needs to get passed in to the multiselect component
    // so you can set state out here in the parent
    // inside it is passed an id, and an array of the currently selected options
    setMultiSelectSelections((prevState) => ({
      ...prevState,
      [id]: selection,
    }));
  }, []);

  const getCompanies = async () => {
    // get the list of companies from the db
    UseLoading("companies", true);
    const response = await fetch(companiesURL)
      .then((res) => res.json())
      .catch((e) => console.error(e.message));
    setCompaniesOnRecord(response);
    UseLoading("companies", false);
  };

  function getBody() {
    // return a body object for API calls
    return {
      start,
      end,
      member_class: multiSelectSelections.multiSelectClasses,
      company: multiSelectSelections.multiSelectCompanies,
    };
  }

  const onToggleView = async () => {
    // toggle between call sheet view and charts view

    if (view === "Calls") {
      // only fetch for charts view when needed since it's a slow request

      try {
        UseLoading("chartData", true);
        const parsedResponse = await getData(memberTotalsURL, { ...getBody() });
        setChartData(prepareDatasets(parsedResponse));
      } catch (error) {
        setChartData([]);
      } finally {
        UseLoading("chartData", false);
      }
    }

    setView(view === "Charts" ? "Calls" : "Charts");
    setSearchField("");
  };

  const onButtonSubmit = async (event) => {
    // button to get selected records from db
    if (!validateDateInput(start, end)) return;

    try {
      UseLoading("jobCalls", true);
      setCallCardData(await getData(callsURL, { ...getBody() }));
    } catch (error) {
      setCallCardData([]);
    } finally {
      UseLoading("jobCalls", false);
    }

    if (view === "Charts") {
      try {
        UseLoading("chartData", true);
        const parsedResponse = await getData(memberTotalsURL, { ...getBody() });
        setChartData(prepareDatasets(parsedResponse));
      } catch (error) {
        setChartData([]);
      } finally {
        UseLoading("chartData", false);
      }
    }
  };

  const filteredCalls = useMemo(
    // filtering based on text input in call sheet view
    () =>
      callCardData.filter((call) =>
        call.summary.toLowerCase().includes(searchField.toLowerCase())
      ),
    [callCardData, searchField]
  );

  const { uniqueJobsByClassification, callsById, count } = useMemo(
    // analyze the call sheets to pull out the unique calls based on the union_call_id
    // determines actual number of jobs created vs total requested members
    () => findUniqueTotals(filteredCalls),
    [filteredCalls]
  );

  const { multiSelectClasses, multiSelectCompanies } = multiSelectSelections;
  return (
    <>
      <Loader
        datasets={chartData}
        loading={Object.values(loading).includes(true)}
      >
        <ExploreRouteGrid>
          <QueryBuilder
            onButtonSubmit={onButtonSubmit}
            start={start}
            end={end}
            onToggleView={onToggleView}
            view={view}
            setStart={setStart}
            setEnd={setEnd}
            isOpen={isOpen}
            toggleOpen={toggleQueryBuilder}
          >
            <MultiSelect
              optionsArray={companiesOnRecord}
              selectedOptionsArray={multiSelectCompanies}
              placeholder={"Search companies"}
              id={"multiSelectCompanies"}
              onSelectionChange={onSelectionChange}
              loading={Object.values(loading).includes(true)}
            />
            <MultiSelect
              optionsArray={Object.keys(colors).sort()}
              itemColors={colors}
              longOptions={readableClassification}
              selectedOptionsArray={multiSelectClasses}
              placeholder={"Search classes"}
              id={"multiSelectClasses"}
              onSelectionChange={onSelectionChange}
              loading={Object.values(loading).includes(true)}
            />
          </QueryBuilder>
          <div
            className="handle"
            style={{
              gridColumn: "1 / 3",
              gridRow: "1 / 1",
              marginLeft: "auto",
              width: "100%",
              borderBottom: "2px solid var(--greyCyan)",
              display: "flex",
              alignItems: "center",
              color: "var(--greyCyan)",
            }}
          >
            <h3 style={{ margin: "0 0 0 10px", padding: "0" }}>
              Electrical Trades Job Calls Database
            </h3>
            <div style={{ display: "flex", marginLeft: "auto"}}>
              <Link to="/login">
                <MenuButtonStyled>
                  🔑
                </MenuButtonStyled>
              </Link>
              <MenuButtonStyled onClick={toggleQueryBuilder}>
                {isOpen ? "×" : "🔍"}
              </MenuButtonStyled>
            </div>
          </div>
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
              <CallCardList
                colors={colors}
                callsById={callsById}
                searchField={searchField}
              />
            </CallsViewGrid>
          )}
        </ExploreRouteGrid>
      </Loader>
    </>
  );
};

export default Explore;
