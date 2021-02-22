import React from 'react';

const SearchBox = ({ searchChange, count }) => {
	return (
		<div className='SearchBox'>
			<input
				type='search'
				placeholder='Filter Calls by Details'
				onChange={searchChange}
			/>
			<p>{count} job calls matched the filter terms</p>
		</div>
	);
}

export default SearchBox;