import styled from "styled-components";
import { colors, readableClassification } from "../config";
import CheckBoxStyled from "./CheckBoxStyled";

const ClassPickerItem = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  margin: 0;

  label {
    color: ${(props) => props.color};
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  span {
    margin: 0 5px 0 5px;
    min-width: 50px;
  }

  &:first-of-type {
    margin-top: 10px;
  }

  &:last-of-type {
    margin-bottom: 10px;
  }
`;

export default function ClassPickerItemStyled({ memberClass, handleBoxClick, checked }) {

  return (
    <ClassPickerItem color={colors[memberClass]}>
      <CheckBoxStyled
        name={memberClass}
        value={memberClass}
        color={colors[memberClass]}
        id={memberClass + "_checkbox"}
        onChange={handleBoxClick}
        checked ={checked}
      />
      <label htmlFor={memberClass + "_checkbox"}>
        <span>{memberClass}</span>
        <span>{readableClassification[memberClass]}</span>
      </label>
    </ClassPickerItem>
  )
}