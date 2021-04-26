import React from 'react';
import { readableClassification } from '../../config'

const ColorLegend = ({ colors, datasets}) => {

	const legendBlocks = [];
	let index = 0;
	for (let key in datasets) {
		if (key === 'Total' || key === "Date") continue;
		legendBlocks.push(
			<li key={key + index}>
				<div className="legendBlock"
					style={{backgroundColor: colors[key]}}>
				</div>
				<span
					className="acronymClassification"
					style={{color: colors[key]}}
					>
					{key}
				</span>
				<span
					className="readableClassification"
					style={{color: colors[key]}}
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
						style={{backgroundColor: 'rgb(250, 250, 250)'}}>
					</div>
					<span className="acronymClassification" style={{color: 'rgb(250, 250, 250)'}}>Total</span>
				</li>
			</ul>
		</div>
	);
}

export default ColorLegend;