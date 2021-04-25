import styled from "styled-components";

const LoaderStyles = styled.div`
	position: relative;
  width: 100%;
  margin: 0;
  padding: 0;

	.loader {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		display: ${props => props.isLoading ? 'flex' : 'none'};

		h1 {
			transition-property: all;
			transition-duration: 1s;
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
			opacity: ${props => props.isLoading ? '1' : '0'};
		}
	}
`;

const Loader = ( { children, datasets, loading }) => {
  return (
    <LoaderStyles isLoading={loading}>
			<div className="loader">
				<h1>Fetching Data</h1>
			</div>
			{children}
		</LoaderStyles>
  )
}

export default Loader;