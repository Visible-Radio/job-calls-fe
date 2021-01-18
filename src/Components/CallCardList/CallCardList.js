import CallCard from '../CallCard/CallCard';

const CallCardList = ({ callCardData, colors }) => {	
	return (						
		<div className="CallCardContainer">
			{
				callCardData.map((call, i) => {
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