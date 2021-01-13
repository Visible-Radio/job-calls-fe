import React from 'react';

const ClassificationPicker = (props) => {
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

	return (
		<div className="ClassificationPicker">			
			<form>
		  	{checkBoxes}		  		
			</form>
			<button
				onClick={props.onButtonSubmit}>View Records</button>
		</div>
	);
}

export default ClassificationPicker;