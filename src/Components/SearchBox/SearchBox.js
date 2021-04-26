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
  font-size: 15px;

  p {
    margin: 0;
    color: var(--greyCyan);
    font-size: 15px;
  }

  input {
    height: 100%;
    text-align: center;
    border-radius: 5px;
    border: none;
    background-color: var(--greyCyan);
    font-size: 15px;
  }

  @media screen and (max-width: 840px) {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
  }
`;

const SearchBox = ({ searchChange, totalCalls, uniqueCalls }) => {
  return (
    <SearchBoxStyles>
      <input
        type="search"
        placeholder="Filter Calls by Details"
        onChange={searchChange}
      />
      <p>{uniqueCalls} unique job calls matched the filter terms</p>
      <p>{totalCalls - uniqueCalls} more appeared multiple days</p>
    </SearchBoxStyles>
  );
};

export default SearchBox;
