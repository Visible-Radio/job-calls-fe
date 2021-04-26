import { useState } from "react";
import styled from "styled-components";
import { FancyButton } from "../FancyButton/FancyButtonStyled";

const CallCardStyled = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
  color: var(--greyCyan);
  border-radius: 20px;
  font-size: 15px;
  padding: 6px;
  align-content: flex-start;
  height: max-content;
  border: 3px solid transparent;
  border-color: ${(props) => props.color + 77};
	transition: height 1s;
	content-visibility: auto;

  div {
    margin: 4px 4px 4px 4px;
    background-color: #0c142a;
    text-align: center;
  }

  p {
    margin: 0.5rem 1rem 1rem 1rem;
  }

  h5 {
    margin: 0;
    color: var(--slate);
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    background-color: ${(props) => props.color};
  }

	.compact {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: transparent;
		color: ${(props) => props.color};
	}

  .classShield {
    border-radius: 0 0 25px 25px;
    display: flex;
		align-items: flex-start;
		justify-content: center;
    padding: 0;
    width: 60px;
		height: 60px;
    background-color: ${(props) => props.color};

    h3 {
      font-weight: bold;
      color: var(--slate);
    }
  }

	h2 {
		padding: 0;
		margin: 1rem;
	}

	.expanded {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		max-height: ${props => props.isOpen ? '1000px' : '0px'};
		transition: max-height 0.5s;
		overflow-y: hidden;
	}
`;

const CallCard = ({ data, color, instances }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	}

  return (
    <CallCardStyled color={color} isOpen={isOpen}>

			<div className="compact">
				<div className="classShield">
					<h3>{data?.member_class}</h3>
				</div>
				<h2>{data?.company}</h2>
				<FancyButton color={color} isOpen={isOpen} onClick={handleClick}></FancyButton>
			</div>

			<div className="expanded">
				<div>
					<h5>Call Date</h5>
					<p>{data?.call_date_from_html}</p>
				</div>
				<div>
					<h5>Start Date</h5>
					<p>{data?.start_date_from_html}</p>
				</div>
				<div>
					<h5>Location</h5>
					<p>{data?.location}</p>
				</div>
				<div>
					<h5>Start Time</h5>
					<p>{data?.start_time}</p>
				</div>
				<div>
					<h5>Members</h5>
					<p>{data?.members_needed}</p>
				</div>
				<div>
					<h5>Union Call ID</h5>
					<p>{data?.union_call_id}</p>
				</div>
				<div>
					<h5>Occurences</h5>
					<p>{instances}</p>
				</div>
				<div>
					<h5>Details</h5>
					<p>{data?.summary}</p>
				</div>
			</div>
    </CallCardStyled>
  );
};

export default CallCard;
