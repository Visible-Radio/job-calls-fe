import { useState } from "react";
import styled from "styled-components";

const LoaderStyles = styled.div`
	position: relative;
  width: 100%;
  margin: 0;
  padding: 0;

	.loader {
		transition: all, 0.3s;
		background-color: ${props => props.lagToggle ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)'};
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		display: ${props => props.isLoading || props.lagToggle ? 'flex' : 'none'};

		z-index: 1;

		h1 {
			margin: 0;
			padding: 1%;
			font-size: 18px;
			letter-spacing: 5px;
			text-transform: uppercase;
			color: var(--yellow);
			border: 2px solid var(--yellow);
			border-radius: 5px;
			background: black;
			z-index: 3;
			opacity: ${props => props.lagToggle && props.isLoading ? '1' : '0'};
			transform: ${props => props.lagToggle && props.isLoading ? 'scale(1)' : 'scale(0.1)'};
			transition: all, 0.3s;
		}
	}

	.children {
		transition: filter, 0.4s;
		filter: ${props => props.isLoading ? 'blur(2px)' : 'blur(0)'};;
	}
`;

const Loader = ( { children, loading }) => {
	const [lagToggle, setLagToggle] = useState(true);
	// lag behind loading by some amount
	setTimeout(() => setLagToggle(loading), 150);

  return (
    <LoaderStyles isLoading={loading} lagToggle={lagToggle}>
			<div className="loader">
				<h1>Fetching Data</h1>
			</div>
			<div className="children">
			{children}
			</div>
		</LoaderStyles>
  )
}

export default Loader;