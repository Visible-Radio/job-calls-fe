import React from 'react';

const StartEndDates = (props) => {

	const humanDate = (iso_date_string) => {
			const myString = new Date(iso_date_string).toUTCString();
			return myString.replace(/ \d\d:\d\d:\d\d \w\w\w/, "");
	}	
	return (
		<div className="StartEndDates">
			<h3>
				<span> Displaying Results for Period: </span>
				<span className="resultDate">{humanDate(props.start)} </span>
				<span>to</span>
				<span className="resultDate">{humanDate(props.end)}</span>
			</h3>
		</div>
	);
}

export default StartEndDates;