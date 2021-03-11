import React from 'react';
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { readableClassification } from '../../config';
import CompanySelect from './CompanySelect';
import { createDate } from '../../utils/createDate';

const ClassificationPicker = (props) => {

	const checkBoxes = [];

	for (let property in readableClassification) {
		checkBoxes.push(
				<div key = {property} className="ClassificationPickerItem">
			    <input
			    	className = "ClassificationPickerCheckbox"
			    	type="checkbox"
			    	id={property + "_checkbox"}
			    	name={property}
			    	value={property}
			    	style={
			    		{borderColor: props.colors[property]}
			    	}
			    />
			    <label
			    	htmlFor={property + "_checkbox"}
			    	style={{color: props.colors[property]}}
			    	>
			    		<span className="acronymClassification">{property}</span>
			    		<span className="readableClassification">{readableClassification[property]}</span>
			    </label>
		  	</div>
			)
	}

	const Options = {
		mode: "single",
		allowInput: false,
		//no records older than this minDate
		minDate: "2020-12-04",
		maxDate: new Date(),
	}

	// determine the range of calls to initially fetch
	// const defaultStart = props.start;
	// const defaultEnd = props.end;

	return (
		<div id="ClassificationPicker" className="ClassificationPicker">
			<button id="pickerHandle" onClick={props.handlePickerSize}>☰</button>
			<div className="wrapperR">
				<div className="wrapperC">
					<label htmlFor="startPicker">Start</label>
					<Flatpickr
						id = "startPicker"
						options={Options}
						value={props.start}
						onChange={props.onDatePick}
					/>
				</div>
				<div className="wrapperC">
					<label htmlFor="endPicker">End</label>
					<Flatpickr
						id = "endPicker"
						value={props.end}
						options={Options}
					/>
				</div>
			</div>
			<CompanySelect companies={props.companies}></CompanySelect>

			<form>
		  	{checkBoxes}
			</form>

			<button id="viewRecords"
				onClick={props.onButtonSubmit}>Get Records</button>

			<button
				id="toggleView"
				onClick={props.onToggleView}
				>{`View ${props.view === 'Charts' ? 'Call Sheets' : 'Charts'}`}
			</button>
		</div>
	);
}

export default ClassificationPicker;