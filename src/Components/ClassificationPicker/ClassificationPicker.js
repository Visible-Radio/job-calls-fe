import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { readableClassification } from "../../config";
import CompanySelect from "./CompanySelect";
import ClassPickerItemStyled from "../ClassPickerItemStyled";
import { useState } from "react";
import ClassPickerStyles from "./ClassPickerStyles";

const ClassificationPicker = ({
  companiesOnRecord,
  start,
  end,
  togglePicker,
  onButtonSubmit,
  onToggleView,
  view,
  pickerIsOpen,
}) => {
  const initialSelection = Object.fromEntries(
    Object.keys(readableClassification).map((memberClass) => [
      memberClass,
      false,
    ])
  );

  const [selectedClasses, setSelectedClasses] = useState(initialSelection);
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [selectedStartDate, setSelectedStartDate] = useState(start)
  const [selectedEndDate, setSelectedEndDate] = useState(end)

  const handleBoxClick = (event) => {
    const clicked = event.target.value;
    setSelectedClasses((prevState) => ({
      ...prevState,
      [clicked]: !prevState[clicked],
    }));
  };

  const transformCheckBoxStateToArray = () => {
    // this array will be attached via data-value to our button
    return Object.entries(selectedClasses)
      .filter(([memberClass, checked]) => checked)
      .map((pair) => pair[0]);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany([event.target.value]);
  };

  const handleStartDateChange = (event) => {
    setSelectedStartDate(new Date(event[0]).toISOString().slice(0, 10));
  }

  const handleEndDateChange = (event) => {
    setSelectedEndDate(new Date(event[0]).toISOString().slice(0, 10));
  }

  const Options = {
    mode: "single",
    allowInput: false,
    //no records older than this minDate
    minDate: "2020-12-04",
    maxDate: new Date(),
  };

  return (
    <ClassPickerStyles pickerIsOpen={pickerIsOpen}>
      <button id="pickerHandle" onClick={togglePicker}>
        {pickerIsOpen ? "☰" : "×"}
      </button>
      <div className="wrapperR">
        <div className="wrapperC">
          <label htmlFor="startPicker">Start</label>
          <Flatpickr id="startPicker" options={Options} value={selectedStartDate} onChange={handleStartDateChange} />
        </div>
        <div className="wrapperC">
          <label htmlFor="endPicker">End</label>
          <Flatpickr id="endPicker" value={selectedEndDate} options={Options} onChange={handleEndDateChange} />
        </div>
      </div>

      <CompanySelect
        companiesOnRecord={companiesOnRecord}
        handleCompanyChange={handleCompanyChange}
        value={selectedCompany}
      ></CompanySelect>

      <form style={{ cursor: "pointer" }}>
        {Object.keys(readableClassification).map((memberClass, i) => {
          const isChecked = selectedClasses[memberClass];
          return (
            <ClassPickerItemStyled
              memberClass={memberClass}
              key={memberClass + i}
              handleBoxClick={handleBoxClick}
              checked={isChecked}
            />
          );
        })}
      </form>

      <button
        id="viewRecords"
        onClick={onButtonSubmit}
        data-classes={JSON.stringify(transformCheckBoxStateToArray())}
        data-company={JSON.stringify(selectedCompany)}
        data-range={JSON.stringify([selectedStartDate, selectedEndDate])}
      >
        Get Records
      </button>

      <button id="toggleView" onClick={onToggleView}>
        {`View ${view === "Charts" ? "Call Sheets" : "Charts"}`}
      </button>
    </ClassPickerStyles>
  );
};

export default ClassificationPicker;
