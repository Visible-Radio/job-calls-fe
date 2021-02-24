import React from 'react';

const Loader = ( { children, datasets }) => {
  let waitingOpacity = 0;
	let scale = 1;
	const loadingOverlay = document.querySelector('.loadingFlex');
	if (datasets && Object.keys(datasets).length === 0) {
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
    <div className='loadingRef'>
			<div className='loadingFlex' style={{display: 'flex'}}>
				<h1 className='noData' style={{opacity: waitingOpacity, transform: scale}}>Fetching Data</h1>
			</div>
			{children}
		</div>
  )

}

export default Loader;




