import styled from "styled-components";

const ClassPickerStyles = styled.div`
  position: relative;
  align-self: end;
  background-color: var(--lightBlack);
  font-size: 15px;
  width: 100%;
  height: auto;
  margin: 0;
  transition-property: transform;
  transition-duration: 0.5s;
  border: 3px solid var(--magenta);
  align-self: start;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
  transform: translateX(0);
  transform: ${(props) => props.pickerIsOpen && "translateX(-100%)"};

  #pickerHandle {
    position: absolute;
    left: calc(100% + 3px);
    top: -3px;
    background-color: var(--magenta);
    height: 25px;
    width: 30px;
    border-radius: 0 5px 5px 0;
    z-index: -1;
    writing-mode: vertical-rl;
    letter-spacing: 3px;
    color: var(--brightMagenta);
  }

  #pickerHandle:hover {
    color: var(--magenta);
    background-color: var(--brightMagenta);
  }

  label[for="startPicker"],
  label[for="endPicker"],
  label[for="companySelect"] {
    color: var(--greyCyan);
  }

  .wrapperC {
  display: flex;
  padding: 2px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1px;
  }

  .wrapperR {
    display: flex;
  }

  .wrapperC label {
    margin: 2px;
  }

  #viewRecords {
    width: 100%;
  }

  #toggleView {
    align-self: center;
    margin: 15px 0 5px 0;
    width: 50%;
    border-radius: 10px;
  }

  #startPicker, #endPicker {
    &:hover {
      cursor: pointer;
      background-color: var(--brightCyan);
    }
  }

  #startPicker,
  #endPicker {
    background-color: var(--greyCyan);
    margin: 0;
    font-size: 14px;
    text-align: center;
    width: 100%;
    max-width: 131px;
    border: none;
    transition: background-color 0.2s;
  }
  .flatpickr-input {
    /* for mobile native date pickers that don't obey... */
    width: 131px;
  }

  .CompanySelect select {
    margin-top: 0;
    font-size: 14px;
    padding: 0.1rem;
    background-color: var(--greyCyan);
    text-align: center;
    width: 100%;
    border: none;
    transition: background-color 0.2s;
  }
  .CompanySelect select:hover {
    background-color: var(--brightCyan);
  }
  .CompanySelect select:disabled {
    background-color: var(--disabledInput);
    max-width: 100%;
    min-width: 266px;
  }

  @media screen and (max-width: 450px) {
  /* native date pickers on mobile don't respect widths */
  .wrapperR {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export default ClassPickerStyles;
