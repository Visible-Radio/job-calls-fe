import React from 'react';

const CallCard = ({ data, color }) => {
	
	return (
		<div className="CallCard">
			<div style={{backgroundColor: color}}>
				<h5 className="lbl">Class</h5>
				<p style={{color: "#1c243a", fontWeight: "bold"}}>{data?.member_class}</p>
			</div>
			<div>
				<h5 className="lbl">Call Date</h5>
				<p>{data?.call_date_from_html}</p>
			</div>
			<div>
				<h5 className="lbl">Start Date</h5>
				<p>{data?.start_date_from_html}</p>
			</div>	
			<div>
				<h5 className="lbl">Company</h5>
				<p>{data?.company}</p>
			</div>
			<div>
				<h5 className="lbl">Location</h5>
				<p>{data?.location}</p>
			</div>																			
			<div>
				<h5 className="lbl">Start Time</h5>
				<p>{data?.start_time}</p>
			</div>
			<div>
				<h5 className="lbl">Members</h5>
				<p>{data?.members_needed}</p>
			</div>
			<div>
				<h5 className="lbl">Union Call ID</h5>
				<p>{data?.union_call_id}</p>
			</div>
			<div>
				<h5 className="lbl">Details</h5>
				<p>{data?.summary}</p>
			</div>					
		</div>
		);
}

export default CallCard;