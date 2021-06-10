import { useState } from "react";
import styled from "styled-components";

const InputStyles = styled.input`
  box-sizing: border-box;
  font-size: 1.125rem;
  color: var(--greyCyan);
  flex: auto;
  min-width: 200px;
  width: 50%;
  background-color: transparent;
  padding: 3px 6px 2px 6px;
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
  border: none;
  border-bottom: 2px solid var(--greyCyan);
  transition: background-color 0.3s;
  &:focus {
    outline: none;
    background-color: rgba(0,0,0,0.5);
    border-bottom: 2px solid var(--greyCyan);
  }
  &:hover {
  }
  &::placeholder {
    color: var(--greyCyan);
    opacity: 0.4;
  }
`;

const InputStyled = ({ placeholder, type, name, value, onChange }) => {

  const [placeHolder, setPlaceHolder] = useState(placeholder);

  const handleFocus = (event) => {
    setPlaceHolder('');
  }

  const handleInput = (event) => {
    if (!event.target.value.length)
    setPlaceHolder(placeHolder);
  }

  const handleBlur = (event) => {
    if (!event.target.value.length)
    setPlaceHolder(placeholder);
  }

  return (
    <InputStyles
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeHolder}
      onFocus={handleFocus}
      onInput={handleInput}
      onBlur={handleBlur}
    />
  )
}

export default InputStyled


