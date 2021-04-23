import styled from "styled-components";

const LoaderStyles = styled.div`
	position: relative;
  width: 100%;
  margin: 0;
  padding: 0;

	.loadingFlex {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		display: flex;
	}

`;

const Loader = ( { children, isLoading }) => {

  let waitingOpacity = 0;
	let scale = 1;
	const loadingOverlay = document.querySelector('.loadingFlex');
	if (isLoading) {
		waitingOpacity = 1;
		scale = 'scale(1)';
		if (loadingOverlay) loadingOverlay.style.setProperty('display', 'flex');
	} else {
		waitingOpacity = 0;
		scale = 'scale(0)';
		if (loadingOverlay) {
			setTimeout(()=> {
				loadingOverlay.style.setProperty('display', 'none');
			},1000);
		}
	}
  return (
    <div>
			<div className='loadingFlex' style={{display: 'flex'}}>
				<h1 className='noData' style={{opacity: waitingOpacity, transform: scale}}>Fetching Data</h1>
			</div>
			{children}
		</div>
  )

}

export default Loader;