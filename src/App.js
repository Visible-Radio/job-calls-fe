import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import LineGraph from "./Components/LineGraph/LineGraph";
import TotalLineGraph from "./Components/TotalLineGraph/TotalLineGraph";
import DoughnutGraphUniqueJobs from "./Components/DoughnutGraph/DoughnutGraphUniqueJobs";
import ColorLegend from "./Components/ColorLegend/ColorLegend";
import SearchBox from "./Components/SearchBox/SearchBox";
import CallCardList from "./Components/CallCardList/CallCardList";
import Loader from "./Components/Loader/Loader";
import { colors, readableClassification } from "./config";
import { createDate } from "./utils/createDate";
import findUniqueTotals from "./utils/findUniqueTotals";
import validateDateInput from "./utils/validateDateInput";
import BottomDrawer from "./Components/BottomDrawer/BottomDrawer";
import CallsViewGrid from "./Components/LayoutComponents/CallsViewGrid";
import ExploreRouteGrid from "./Components/LayoutComponents/ExploreRouteGrid";
import GraphViewGrid from "./Components/LayoutComponents/GraphViewGrid";
import GraphViewSubGrid from "./Components/LayoutComponents/GraphViewSubGrid";
import MultiSelect from "./Components/MultiSelect/MultiSelect";
import QueryBuilder from "./Components/QueryBuilder/QueryBuilder";
import { MenuButtonStyled } from "./Components/ButtonStyled";

const ExploreRoute = () => {
  const [chartData, setChartData] = useState({});
  const [callCardData, setCallCardData] = useState([]);
  const [start, setStart] = useState(
    createDate(-14, 0, 0).toISOString().slice(0, 10)
  );
  const [end, setEnd] = useState(() => new Date().toISOString().slice(0, 10));
  const [companiesOnRecord, setCompaniesOnRecord] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [view, setView] = useState("Calls");
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState({});
  const [multiSelectSelections, setMultiSelectSelections] = useState({
    multiSelectCompanies: [],
    multiSelectClasses: [],
  });

  const UseLoading = (loadingProperty, isLoading) => {
  // keep one loading object with properties for whatever is loading
  setLoading((prevState) => ({
    ...prevState,
    [loadingProperty]: isLoading,
  }));
  };

  useEffect(() => {
    // get the complete list of companies from db
    getCompanies();
    // set the initial selections for our multi select component
    setMultiSelectSelections({
      multiSelectCompanies: [],
      multiSelectClasses: [],
    });
    // get the initial job calls, empty arrays = all companies, all classes
    getJobCalls(start, end, [], []);
  }, []);

  const getCompanies = async () => {
    UseLoading("companies", true);
    const response = await fetch("http://localhost:4000/API/companies")
      .then((res) => res.json())
      .catch((e) => console.error(e.message));
    setCompaniesOnRecord(response);
    UseLoading("companies", false);
  };

  const getJobCalls = async (
    startDate,
    endDate,
    multiSelectCompanies,
    multiSelectClasses
  ) => {
    if (
      Array.isArray(multiSelectCompanies) &&
      multiSelectCompanies.length > 32
    ) {
      alert("Please select no more than 32 companies");
      return;
    }

    const url = "http://localhost:4000/API";
    const body = {
      start: startDate,
      end: endDate,
    };

    if (multiSelectClasses?.length > 0) {
      body.member_class = multiSelectClasses;
    }
    if (
      !multiSelectCompanies.includes("All Companies") &&
      multiSelectCompanies.length
    ) {
      body.company = multiSelectCompanies;
    }

    UseLoading("jobCalls", true);
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parsedResponse = await response.json();
      setCallCardData(parsedResponse);
    } catch (error) {
      console.error(error.message);
    } finally {
      UseLoading("jobCalls", false);
    }
  };

  const getMemberTotals = async (
    startDate,
    endDate,
    multiSelectCompanies,
    multiSelectClasses
  ) => {

    if (
      Array.isArray(multiSelectCompanies) &&
      multiSelectCompanies.length > 32
    ) {
      alert("Please select no more than 32 companies");
      return;
    }

    const url = "http://localhost:4000/API/members_needed_byDate/";
    const body = {
      start: startDate,
      end: endDate,
    };

    if (multiSelectClasses?.length > 0) {
      body.member_class = multiSelectClasses;
    }
    if (
      !multiSelectCompanies.includes("All Companies") &&
      multiSelectCompanies.length
    ) {
      body.company = multiSelectCompanies;
    }

    UseLoading("chartData", true);
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parsedResponse = await response.json();

      if (typeof parsedResponse !== "object") {
        throw parsedResponse;
      }
      // massage the data for the charts view
      const chartData = prepareDatasets(parsedResponse);
      setChartData(chartData);

    } catch (error) {
      console.error(error.message);
    } finally {
      UseLoading("chartData", false);
    }

    function prepareDatasets(response) {
      const keys = Object.keys(response[0]);
      const datasets = {};
      keys.forEach((key) => (datasets[key] = []));
      response.forEach((obj) => {
        for (let key in obj) {
          datasets[key].push(obj[key]);
        }
      });
      return datasets;
    };
  };

  const toggleOpen = () => {
    // toggle the query builder
    setIsOpen(!isOpen);
  };

  const onToggleView = () => {
    // toggle between call sheet view and charts view
    if (view === "Calls") {
      getMemberTotals(
        start,
        end,
        multiSelectSelections.multiSelectCompanies,
        multiSelectSelections.multiSelectClasses
      );
    }
    setView(view === "Charts" ? "Calls" : "Charts");
    setSearchField("");
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

  const onButtonSubmit = (event) => {
    // button to get selected records from db
    if (!validateDateInput(start, end)) return;
    getJobCalls(
      start,
      end,
      multiSelectSelections.multiSelectCompanies,
      multiSelectSelections.multiSelectClasses
    );
    if (view === "Charts") {
      getMemberTotals(
        start,
        end,
        multiSelectSelections.multiSelectCompanies,
        multiSelectSelections.multiSelectClasses
      );
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
            toggleOpen={toggleOpen}
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
            <MenuButtonStyled onClick={toggleOpen}>
              {isOpen ? "×" : "☰"}
            </MenuButtonStyled>
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

export default ExploreRoute;
