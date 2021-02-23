import CallCard from '../CallCard/CallCard';

const CallCardList = ({ filteredCalls, colors, staleCalls }) => {

	return (
		<div className="CallCardList">
			{
				filteredCalls?.map((call, i) => {
					if (staleCalls.found.includes(i)) return null;

					let occurences = 1;
					if (staleCalls.duplicates.hasOwnProperty(call.union_call_id)) {

						occurences = staleCalls.duplicates[call.union_call_id].duplicate_indicies.length;
					}

					return (
							<CallCard
								index = { i }
								occurences = { occurences }
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