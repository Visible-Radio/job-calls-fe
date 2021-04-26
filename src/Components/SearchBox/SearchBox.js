const SearchBox = ({ searchChange, totalCalls, uniqueCalls }) => {

	return (
		<div className='SearchBox'>
			<input
				type='search'
				placeholder='Filter Calls by Details'
				onChange={searchChange}
			/>
			<p>{uniqueCalls} unique job calls matched the filter terms</p>
			<p>{totalCalls - uniqueCalls} more appeared multiple days</p>
		</div>
	);
}

export default SearchBox;