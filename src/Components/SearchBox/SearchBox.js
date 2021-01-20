import React from 'react';

const SearchBox = ({ searchChange, count }) => {
	return (
		<div className='SearchBox'>			
			<p>Filter results by description</p>
			<input				
				type='search'
				placeholder='filter by details'
				onChange={searchChange}
			/>
			<p>e.g. 'fire alarm', 'conduit', 'short term', 'slab', 'tenant', 'outdoor', 'overtime', 'distribution', 'CFAE'</p>
			<p>{count} job calls matched the filter terms</p>
			<p>Keep in mind descriptions do not use standardized language</p>
			<p>Searching 'conduit' will screen out calls that mention 'EMT'</p>
		</div>	
	);
}

export default SearchBox;