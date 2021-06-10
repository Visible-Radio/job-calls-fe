import { useState } from "react";
import styled from "styled-components";

const SearchBoxStyles = styled.div`
  grid-column: 2 / -1;
  grid-row: 1 / 2;

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  flex: auto;
  justify-content: center;
  margin: 0;
  width: 100%;
  min-height: 45px;
  font-size: 15px;
  border-bottom: 2px solid var(--greyCyan);

  .resultInfo {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  p {
    margin: 0.25rem 1rem 0.25rem 1rem;
    color: var(--greyCyan);
    font-size: 1rem;
  }

  input {
    box-sizing: border-box;
    font-size: 1.125rem;
    color: var(--greyCyan);
    flex: auto;
    background-color: transparent;
    padding: 0 3px 0 3px;
    margin: 0.5rem 0.5rem 0.5rem 0.5rem;
    border: none;
    border-bottom: 2px solid var(--greyCyan);
    &:focus {
      outline: none;
      border-bottom: 2px solid var(--greyCyan);
    }
    &:hover {
      background-color: transparent;
    }
    &::placeholder {
      color: var(--greyCyan);
      opacity: 0.4;
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
      <div className="resultInfo">
        <p>{uniqueCalls} unique job calls matched the filter terms</p>
        <p>{totalCalls - uniqueCalls} more appeared multiple days</p>
      </div>
    </SearchBoxStyles>
  );
};

export default SearchBox;
