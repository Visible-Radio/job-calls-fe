import React from 'react';

const SearchBox = ({ searchChange }) => {
	return (
		<div className='SearchBox'>
			<input				
				type='search'
				placeholder='filter by details'
				onChange={searchChange}
			/>
			<p>e.g. 'fire alarm', 'conduit', 'short term', 'slab', 'tenant', 'outdoor'</p>
		</div>	
	);
}

export default SearchBox;