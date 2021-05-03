import React from "react";
import styled from "styled-components";

const StartEndDatesStyles = styled.div`
	grid-column: 1 / 3;

	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: center;
	margin-bottom: 0;
	padding: 5px;
	width: 100%;

	h3 {
		margin: 0;
		color: var(--greyCyan);
		font-size: 12px;
		min-width: fit-content;
		margin-bottom: 0;
	}

	&:nth-child(1) {
		justify-self: start;
	}
	&:nth-child(2) {
		justify-self: end;
	}
`;

const StartEndDates = ({ company, start, end }) => {
  const humanDate = (iso_date_string) => {
    const myString = new Date(iso_date_string).toUTCString();
    return myString.replace(/ \d\d:\d\d:\d\d \w\w\w/, "");
  };
  return (
    <StartEndDatesStyles>
      {company.length && company !== 'All Companies' ? (
        <h3>Results Matching '{company.join(', ')}'</h3>
      ) : (
        <h3>Results For All Companies</h3>
      )}

      <h3>
        {humanDate(start)}
        {" to "}
        {humanDate(end)}
      </h3>
    </StartEndDatesStyles>
  );
};

export default React.memo(StartEndDates);
