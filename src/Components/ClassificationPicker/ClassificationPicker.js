import React from 'react';
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { readableClassification } from '../../config';
import CompanySelect from './CompanySelect';

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
			    	// onClick={props.onCheckBoxClick}
			    	style={
			    		{borderColor: props.colors[property]}
			    	}
			    />
			    <label
			    	htmlFor={property + "_checkbox"}
			    	style={{color: props.colors[property]}}
			    	>
			    		<div className="acronymClassification"><span>{property}</span></div>
			    		<span className="readableClassification">{readableClassification[property]}</span>
			    </label>
		  	</div>
			)
	}

	const Options = {
		mode: "single",
		allowInput: false,
		minDate: "2020-12-04",
		maxDate: new Date(),
	}

	const defaultStart = "2020-12-04";
	const defaultEnd = Options.maxDate;

	return (
		<div className="ClassificationPicker">
			<button id="openPickers" onClick={props.handlePickerSize}>Select Period and Classifications</button>
			<label htmlFor="startPicker">Start Date</label>
			<Flatpickr
				id = "startPicker"
				options={Options}
        value={defaultStart}
        onChange={props.onDatePick}
      />
      <label htmlFor="endPicker">End Date</label>
      <Flatpickr
      	id = "endPicker"
        value={defaultEnd}
        options={Options}
      />
      {/* <div>
      <label htmlFor="companyInput">Company</label>
	      <input
					id = "companyInput"
					type='search'
					placeholder='Leave blank for all'
					maxLength="25"
					/>
			</div> */}
			<CompanySelect companies={props.companies}></CompanySelect>
			<form>
		  	{checkBoxes}
			</form>
			<button id="viewRecords"
				onClick={props.onButtonSubmit}>View Records</button>
		</div>
	);
}

export default ClassificationPicker;