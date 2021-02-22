import CallCard from '../CallCard/CallCard';

const CallCardList = ({ filteredCalls, callCardData, colors }) => {

	return (
		<div className="CallCardList">
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