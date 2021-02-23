import React from 'react';

const CallCard = ({ data, color, index, occurences }) => {
	let stale = 'notStale';
	if (occurences > 1) stale = 'stale'
	return (
		<div className={`CallCard ${stale}`} style={{border: `6px solid ${color + '77'}`}}>

			{/* <div>
				added for development
				<h5 style={{backgroundColor: color}} className="lbl">index</h5>
				<p>{index}</p>
			</div> */}

			<div className="classShield" style={{backgroundColor: color}}>
				<h5 className="lbl">Class</h5>
				<p style={{color: "#1c243a", fontWeight: "bold"}}>{data?.member_class}</p>
			</div>
			<div>
				<h5 style={{backgroundColor: color}} className="lbl">Call Date</h5>
				<p>{data?.call_date_from_html}</p>
			</div>
			<div>
				<h5 style={{backgroundColor: color}} className="lbl">Start Date</h5>
				<p>{data?.start_date_from_html}</p>
			</div>
			<div>
				<h5 style={{backgroundColor: color}} className="lbl">Company</h5>
				<p>{data?.company}</p>
			</div>
			<div>
				<h5 style={{backgroundColor: color}} className="lbl">Location</h5>
				<p>{data?.location}</p>
			</div>
			<div>
				<h5 style={{backgroundColor: color}} className="lbl">Start Time</h5>
				<p>{data?.start_time}</p>
			</div>
			<div>
				<h5 style={{backgroundColor: color}} className="lbl">Members</h5>
				<p>{data?.members_needed}</p>
			</div>
			<div>
				<h5 style={{backgroundColor: color}} className="lbl">Union Call ID</h5>
				<p>{data?.union_call_id}</p>
			</div>
			<div>
				<h5 style={{backgroundColor: color}} className="lbl">Occurences</h5>
				<p>{ occurences }</p>
			</div>
			<div>
				<h5 style={{backgroundColor: color}} className="lbl">Details</h5>
				<p>{data?.summary}</p>
			</div>
			{/* <div className="staleBadge">Stale Call</div> */}
		</div>
		);
}

export default CallCard;