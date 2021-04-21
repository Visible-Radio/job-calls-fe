import styled from "styled-components";

const Box = styled.input`
  margin: 0;
  cursor: pointer;
  appearance: none;
  height: 16px;
  width: 16px;
  border: 2px solid #2c344a;
  border-color: ${(props) => props.color};
  box-sizing: border-box;
  transition-property: border-width;
  transition-duration: 0.2s;

  &:focus {
    outline-color: var(--greyCyan);
    outline-style: dashed;
  }

  &:checked {
    transition-property: border-width;
    transition-duration: 0.2s;
    border-width: 8px;
  }
`;

export default function CheckBoxStyled({ name, value, color, id, onChange, checked }) {

  return (
    <Box
      type="checkbox"
      name={name}
      value={value}
      color={color}
      id={id}
      checked={checked}
      onChange = {onChange}
    />
  );
}
