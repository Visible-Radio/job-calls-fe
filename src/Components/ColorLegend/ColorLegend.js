import React from 'react';

const ColorLegend = (props) => {	
	
	const legendBlocks = [];
	let index = 0;
	for (let key in props.datasets) {
		if (key === 'Total' || key === "Date") continue;	
		legendBlocks.push(
			<li>
				<div className="legendBlock"
					style={{backgroundColor: props.colors[index]?.lineColor}}>				
				</div>
				<span style={{color: props.colors[index]?.lineColor}}>{key}</span>
			</li>
		)
		index++;
	}

	return (
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
	);
}

export default ColorLegend;