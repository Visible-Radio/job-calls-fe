import React from 'react';
import { readableClassification } from '../../config'

const ColorLegend = (props) => {

	const legendBlocks = [];
	let index = 0;
	for (let key in props.datasets) {
		if (key === 'Total' || key === "Date") continue;
		legendBlocks.push(
			<li key={key + index}>
				<div className="legendBlock"
					style={{backgroundColor: props.colors[key]}}>
				</div>
				<span
					className="acronymClassification"
					style={{color: props.colors[key]}}
					>
					{key}
				</span>
				<span
					className="readableClassification"
					style={{color: props.colors[key]}}
					>
					{readableClassification[key]}
				</span>
			</li>
		)
		index++;
	}

	return (
		<div className="ColorLegend">
			<ul className="legend">
				{legendBlocks}
				<li key={"ColorLegendTotal_static_li"}>
					<div className="legendBlock"
						style={{backgroundColor: 'rgb(200, 200, 0)'}}>
					</div>
					<span className="acronymClassification" style={{color: 'rgb(255, 255, 0)'}}>Total</span>
				</li>
			</ul>
		</div>
	);
}

export default ColorLegend;