import CallCard from '../CallCard/CallCard';
import SearchBox from '../SearchBox/SearchBox';
import { useState } from 'react';


const CallCardList = ({ callCardData, colors }) => {

	const [searchField, setSearchField] = useState('');

	const onSearchChange = (event) => {
		setSearchField(event.target.value);
	}

	const filteredCalls = callCardData.filter(call => {
		return call.summary.toLowerCase().includes(searchField.toLowerCase());
	})

	return (
		<div className="CallCardContainer">
			<SearchBox
    		searchChange={onSearchChange}
    		count={filteredCalls.length}
      />
			{
				filteredCalls?.map((call, i) => {
					return (
							<CallCard
								data = {filteredCalls[i]}
								key = {"reactKey" + i}
								color = {colors[filteredCalls[i].member_class]}
							/>
						)
				})
			}
		</div>
	);
}

export default CallCardList