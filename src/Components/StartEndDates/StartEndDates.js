import React from 'react';

const StartEndDates = (props) => {
	const humanDate = (iso_date_string) => {
			const myString = new Date(iso_date_string).toUTCString();
			return myString.replace(/ \d\d:\d\d:\d\d \w\w\w/, "");
	}
	return (
		<div id="StartEndDates">
			{
				(function(){
					return props.company.length?
						<h3>Results Matching '{props.company}'</h3>
						:
						<h3>Results For All Companies</h3>
				}())
			}
			<h3>
				{humanDate(props.start)}
				{' to '}
				{humanDate(props.end)}
			</h3>
		</div>
	);
}

export default StartEndDates;