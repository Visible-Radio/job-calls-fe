import { useState } from "react";
import styled from "styled-components";

const SearchBoxStyles = styled.div`
  grid-column: 2 / -1;
  grid-row: 1 / 2;

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 5px 10px 10px 35px;
  width: 100%;
  min-height: 45px;
  font-size: 15px;

  p {
    margin: 5px 40px 0px 5px;
    color: var(--greyCyan);
    font-size: 15px;
  }

  input {
    min-height: 25px;
    text-align: center;
    border-radius: 5px;
    border: none;
    background-color: var(--greyCyan);
    font-size: 15px;
    margin-right: 10px;

    &::placeholder {
      color: black;
    }

    &:focus {
      background-color: var(--brightCyan);
    }
  }

  @media screen and (max-width: 840px) {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
  }
`;

const SearchBox = ({ searchChange, totalCalls, uniqueCalls }) => {
  const [placeHolder, setPlaceHolder] = useState('Filter Calls By Details');

  const handleFocus = (event) => {
    setPlaceHolder('');
  }

  const handleInput = (event) => {
    if (!event.target.value.length)
    setPlaceHolder('Filter Calls By Details');
  }

  const handleBlur = (event) => {
    if (!event.target.value.length)
    setPlaceHolder('Filter Calls By Details');
  }

  return (
    <SearchBoxStyles>
      <input
        type="search"
        placeholder={placeHolder}
        onChange={searchChange}
        onFocus={handleFocus}
        onInput={handleInput}
        onBlur={handleBlur}
      />
      <p>{uniqueCalls} unique job calls matched the filter terms</p>
      <p>{totalCalls - uniqueCalls} more appeared multiple days</p>
    </SearchBoxStyles>
  );
};

export default SearchBox;
