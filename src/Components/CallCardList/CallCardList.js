import CallCard from '../CallCard/CallCard';
import SearchBox from '../SearchBox/SearchBox';

const CallCardList = ({ callCardData, colors, searchChange }) => {	
	return (								
		<div className="CallCardContainer">			
			<SearchBox 
    		searchChange={searchChange}
    		count={callCardData.length}
      />
			{
				callCardData?.map((call, i) => {
					return (
							<CallCard 
								data = {callCardData[i]} 
								key = {"reactKey" + i}
								color = {colors[callCardData[i].member_class]}
							/>							
						)
				})
			}
		</div>						
	);
}

export default CallCardList