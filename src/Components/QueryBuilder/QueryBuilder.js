import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { ButtonStyled, MenuButtonStyled } from "../ButtonStyled";
import styled from "styled-components";

//position: absolute;
const QueryBuilderStyles = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  position: relative;
  padding: 10px;
  background-color: var(--lightBlack);
  width: 100%;
  z-index: 2;
  max-height: ${props => props.isOpen ? '100vh' : '0vh'};
  transform: ${props => props.isOpen ? 'translateX(0);' : 'translateX(-100%)'};
  transition: max-height 0.3s ease-in-out, transform 0.3s ease-in-out;

  .datePicker {
    background-color: var(--lightBlack);
    color: var(--greyCyan);
    border: 2px solid var(--greyCyan);
    font-size: 1rem;
    padding: 0.25rem;
    border-radius: 1rem;
    height: 2.25rem;
    text-align: center;
    transition: background-color 0.4s;
    margin: 4px;
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
    padding: 0;
  }

  label {
    color: var(--greyCyan);
  }

  @media screen and (max-width: 420px) {
    height: 100vh;
  }
`;

export default function QueryBuilder({ children, start, end, setStart, setEnd, onButtonSubmit, onToggleView, toggleOpen, isOpen, view}) {

  const fallBackDate = new Date().toISOString().slice(0, 10);

  const handleStartDateChange = (event) => {
    // handling for native datepickers that allow the user to clear the input
    // if they clear it, we'll get an undefined value that will break the datepicker
    if (event[0] === undefined) {
      setStart(fallBackDate);
      return;
    }
    setStart(new Date(event[0]).toISOString().slice(0, 10));
  }

  const handleEndDateChange = (event) => {
    if (event[0] === undefined) {
      setEnd(fallBackDate);
      return;
    }
    setEnd(new Date(event[0]).toISOString().slice(0, 10));
  }

  const handleSubmit = (event) => {
    onButtonSubmit(event);
  }

  const Options = {
    mode: "single",
    allowInput: false,
    //no records older than this minDate
    minDate: "2020-12-04",
    maxDate: new Date().toISOString().slice(0, 10),
  };

  return (
    <QueryBuilderStyles isOpen={isOpen}>
      {children}
      <div className="horizontalWrapper">
        <div className="columnWrapper">
          <label htmlFor="startPicker">Start</label>
          {/* the required attribute keeps the little clear button from showing up on firefox android */}
          <Flatpickr required id="startPicker" className="datePicker" options={Options} value={start} onChange={handleStartDateChange} />
        </div>
        <div className="columnWrapper">
          <label htmlFor="endPicker">End</label>
          <Flatpickr required id="endPicker" className="datePicker" value={end} options={Options} onChange={handleEndDateChange} />
        </div>
        <ButtonStyled onClick={handleSubmit}>Get Records</ButtonStyled>
        <ButtonStyled onClick={onToggleView}>{`View ${view === "Charts" ? "Call Sheets" : "Charts"}`}</ButtonStyled>
        <MenuButtonStyled onClick={toggleOpen}>×</MenuButtonStyled>
      </div>
    </QueryBuilderStyles>

  )
}