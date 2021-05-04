import { useState } from "react";
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { ButtonStyled } from "../ButtonStyled";
import styled from "styled-components";

const QueryBuilderStyles = styled.div`
  .datePicker {
    background-color: transparent;
    color: var(--greyCyan);
    border: 2px solid var(--greyCyan);
    font-size: 1rem;
    padding: 0.25rem ;
    border-radius: 1rem;
    text-align: center;
    transition: background-color 0.4s;
    margin: 0.25rem 0.25rem 0.5rem 0.25rem;
    width: 160px;


    &:hover {
      cursor: pointer;
      background-color: var(--greyCyan);
      color: black;
    }
    &:focus {
      background-color: var(--greyCyan);
      color: black;
      outline: 1px solid var(--greyCyan);
    }
    &:active {
      transform: scale(0.97);
    }
  }

  .columnWrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0;
    }

  .horizontalWrapper {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    justify-content: space-around;
  }

  label {
    color: var(--greyCyan);
  }
`;

export default function QueryBuilder({ children, start, end, onButtonSubmit, onToggleView, view, reportDates}) {

  const[localStart, setLocalStart ] = useState(start);
  const[localEnd, setLocalEnd ] = useState(end);

  const handleStartDateChange = (event) => {
    setLocalStart(new Date(event[0]).toISOString().slice(0, 10));
  }

  const handleEndDateChange = (event) => {
    setLocalEnd(new Date(event[0]).toISOString().slice(0, 10));
  }

  const handleSubmit = (event) => {
    reportDates(localStart, localEnd);
    onButtonSubmit(event);
  }

  const Options = {
    mode: "single",
    allowInput: false,
    //no records older than this minDate
    minDate: "2020-12-04",
    maxDate: new Date().toISOString().slice(0, 10)
  };

  return (
    <QueryBuilderStyles>
      {children}
      <div className="horizontalWrapper">
        <div className="columnWrapper">
          <label htmlFor="startPicker">Start</label>
          <Flatpickr id="startPicker" className="datePicker" options={Options} value={localStart} onChange={handleStartDateChange} />
        </div>
        <div className="columnWrapper">
          <label htmlFor="endPicker">End</label>
          <Flatpickr id="endPicker" className="datePicker" value={localEnd} options={Options} onChange={handleEndDateChange} />
        </div>
        <ButtonStyled onClick={handleSubmit}>Get Records</ButtonStyled>
        <ButtonStyled onClick={onToggleView}>{`View ${view === "Charts" ? "Call Sheets" : "Charts"}`}</ButtonStyled>
        <ButtonStyled>{true ? '▲' : '▼'}</ButtonStyled>
      </div>

    </QueryBuilderStyles>
  )
}