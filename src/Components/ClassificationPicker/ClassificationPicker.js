import React from 'react';
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { readableClassification } from '../../config';
import CompanySelect from './CompanySelect';

const ClassificationPicker = (
	{
		colors,
		companies,
		end,
		handlePickerSize,
		onButtonSubmit,
		onToggleView,
		start,
		view
	}) => {

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
			    		{borderColor: colors[property]}
			    	}
			    />
			    <label
			    	htmlFor={property + "_checkbox"}
			    	style={{color: colors[property]}}
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

	return (
		<div id="ClassificationPicker" className="ClassificationPicker">
			<button id="pickerHandle" onClick={handlePickerSize}>☰</button>
			<div className="wrapperR">
				<div className="wrapperC">
					<label htmlFor="startPicker">Start</label>
					<Flatpickr
						id = "startPicker"
						options={Options}
						value={start}
					/>
				</div>
				<div className="wrapperC">
					<label htmlFor="endPicker">End</label>
					<Flatpickr
						id = "endPicker"
						value={end}
						options={Options}
					/>
				</div>
			</div>
			<CompanySelect companies={companies}></CompanySelect>

			<form>
		  	{checkBoxes}
			</form>

			<button id="viewRecords"
				onClick={onButtonSubmit}>Get Records</button>

			<button
				id="toggleView"
				onClick={onToggleView}
				>{`View ${view === 'Charts' ? 'Call Sheets' : 'Charts'}`}
			</button>
		</div>
	);
}

export default ClassificationPicker;