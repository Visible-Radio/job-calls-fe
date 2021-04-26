import React from 'react';
import styled from 'styled-components';
import { readableClassification } from '../../config'

const ColorLegendStyles = styled.div`
  grid-column: 2 / 4;
  grid-row: 2 / 3;

	border: 5px solid var(--slate);
  border-radius: 5px;
  background-color: var(--lightBlack);
  padding: 0.5rem;
  max-width: 100%;
  margin: 10px 0px;

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		list-style-type: none;
		margin: 0;
		padding: 0;
		max-height: 400px;
	}

	.legendBlock {
		display: block;
		height: 15px;
		width: 15px;
	}

	li {
		display: flex;
		align-items: center;
	}

	.readableClassification {
		font-size: 15px;
		opacity: 0.8;
		margin: 0;
	}
	.acronymClassification {
		margin: 0 5px 0 5px;
		min-width: 50px;
	}

	@media screen and (max-width: 840px) {
		grid-column: 1 / 4;
	}


`;

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
		<ColorLegendStyles>
			<ul className="legend">
				{legendBlocks}
				<li key={"ColorLegendTotal_static_li"}>
					<div className="legendBlock"
						style={{backgroundColor: 'rgb(250, 250, 250)'}}>
					</div>
					<span className="acronymClassification" style={{color: 'rgb(250, 250, 250)'}}>Total</span>
				</li>
			</ul>
		</ColorLegendStyles>
	);
}

export default React.memo(ColorLegend);