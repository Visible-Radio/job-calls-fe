import React from 'react';

const SearchBox = ({ searchChange, count, staleCalls }) => {
	const uniqueCalls = count - staleCalls.count;
	return (
		<div className='SearchBox'>
			<input
				type='search'
				placeholder='Filter Calls by Details'
				onChange={searchChange}
			/>
			<p>{uniqueCalls} unique job calls matched the filter terms</p>
			<p>{staleCalls.count} more appeared multiple days</p>
		</div>
	);
}

export default SearchBox;