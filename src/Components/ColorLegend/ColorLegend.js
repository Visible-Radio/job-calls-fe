import React from 'react';

const ColorLegend = (props) => {
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

	const legendBlocks = [];
	let index = 0;
	for (let key in props.datasets) {
		if (key === 'Total' || key === "Date") continue;	
		legendBlocks.push(
			<li>
				<div className="legendBlock"
					style={{backgroundColor: props.colors[index]?.lineColor}}>				
				</div>
				<span 
					className="acronymClassifciation"
					style={{color: props.colors[index]?.lineColor}}
					>
					{key}
				</span>
				<span
					className="readableClassification"
					style={{color: props.colors[index]?.lineColor}}
					>
					{readableClassification[key]}
				</span>
			</li>
		)
		index++;
	}

	return (
		<div>
			<h2>Selected Classifications</h2>
			<div className="ColorLegend">			
				<ul>
					{legendBlocks}
					<li>
						<div className="legendBlock"
							style={{backgroundColor: 'rgb(200, 200, 0)'}}>				
						</div>
						<span style={{color: 'rgb(200, 200, 0)'}}>Total</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default ColorLegend;