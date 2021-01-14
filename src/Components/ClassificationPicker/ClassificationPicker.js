import React from 'react';
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";

const ClassificationPicker = (props) => {

	const handlePickerSize = () => {		
		const picker = document.querySelector('.ClassificationPicker');
		const currentHeight = picker.offsetHeight;
		if (currentHeight > 35) {
			picker.style.height = "35px"
		} else {
			picker.style.height = "450px"
		}
	}

	const readableClassification = {
		JW: "Journeyman ICI",
    AW: "Apprentice ICI",
    JHW: "Journeyman House",
    AHW: "Apprentice House",
    RJW: "Highrise Journeyman",
    JL: "Journeyman Lineman",
    AL: "Apprentice Lineman",
    TEC1: "Comm Tech 1",
    TEC2: "Comm Tech 2",
    TEC3: "Comm Tech 3",
    TEC4: "Comm Tech 4",
    ATEC: "Apprentice Comm Tech",
    CI: "Cable Installer",
    ETN: "Electronics Technician",
    JCS: "Journeyman Cable Splicer",
    U: "Utility Man",
	}
	const checkBoxes = [];
	let index = 0;	
	for (let property in readableClassification) {
		checkBoxes.push(
				<div key = {property}>
			    <input
			    	type="checkbox"
			    	id={property + "_checkbox"}
			    	name={property}
			    	value={property}
			    	onClick={props.onCheckBoxClick}
			    	className="ClassificationPickerCheckbox" 			    	
			    />
			    <label 
			    	htmlFor={property + "_checkbox"}
			    	style={{color: props.colors[index]?.lineColor}}
			    	>
			    		<span className="acronymClassification">{property}</span>
			    		<span className="readableClassification">{readableClassification[property]}</span>
			    </label>
		  	</div>
			)
		index++;		
	}	

	const Options = {
		mode: "single",
		allowInput: false,
		minDate: "2020-12-04",
		maxDate: new Date(),
	}

	const defaultStart = "2020-12-04";
	const defaultEnd = "2020-12-31";	

	return (
		<div className="ClassificationPicker">
			<h2 onClick={handlePickerSize}>Select Classifications</h2>
			<Flatpickr
				id = "startPicker"
				options={Options}        
        value={defaultStart}                
      />
      <Flatpickr
      	id = "endPicker"        
        value={defaultEnd}
        options={Options}        
      />			
			<form>
		  	{checkBoxes}		  		
			</form>
			<button
				onClick={props.onButtonSubmit}>View Records</button>
		</div>
	);
}

export default ClassificationPicker;