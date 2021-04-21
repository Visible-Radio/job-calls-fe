import styled from "styled-components";

const ClassPickerStyles = styled.div`
  position: relative;
  align-self: end;
  background-color: #001320;
  font-size: 15px;
  width: 100%;
  height: auto;
  margin: 0;
  transition-property: transform;
  transition-duration: 0.5s;
  border: 3px solid #6d1158;
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
    background-color: #6d1158;
    height: auto;
    border-radius: 0 5px 5px 0;
    z-index: -1;
    writing-mode: vertical-rl;
    letter-spacing: 3px;
    color: #e932bf;
  }

  #pickerHandle:hover {
    filter: brightness(1.5);
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

  @media screen and (max-width: 450px) {
  /* native date pickers on mobile don't respect widths */
  .wrapperR {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

`;

export default ClassPickerStyles;
