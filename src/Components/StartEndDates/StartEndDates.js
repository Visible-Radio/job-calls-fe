import React from 'react';

const StartEndDates = ({ company, start, end }) => {
	const humanDate = (iso_date_string) => {
			const myString = new Date(iso_date_string).toUTCString();
			return myString.replace(/ \d\d:\d\d:\d\d \w\w\w/, "");
	}
	return (
		<div id="StartEndDates">
			{
				(function(){
					return company.length?
						<h3>Results Matching '{company}'</h3>
						:
						<h3>Results For All Companies</h3>
				}())
			}
			<h3>
				{humanDate(start)}
				{' to '}
				{humanDate(end)}
			</h3>
		</div>
	);
}

export default StartEndDates;