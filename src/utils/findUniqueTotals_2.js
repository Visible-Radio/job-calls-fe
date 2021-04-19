export default function findUniqueTotals_2(callCardData) {
  // look through callCardData
  // create a unique set of job calls where any given union call id appears only once
  // if a union call id appears multiple times, return the one with the largest number of members needed
  // then find the total actual jobs created for each classification

  // we could also include an array of the dates on which the call appeared,
  // or the first and last dates it appeared

  // object from an array of objects where we use one of the object's properties as its key
  const callsById = {};
  callCardData.forEach((call) => {
    if ( callsById.hasOwnProperty(call.union_call_id)) {
      callsById[call.union_call_id].instances.push(call)
      callsById[call.union_call_id].members_needed.push(call.members_needed);
    } else {
      callsById[call.union_call_id] = {
        instances: [call],
        members_needed: [call.members_needed]
      };
    }
  });

  // for (let call in callsById) {
  //   console.log('callsById[call] :>> ', callsById[call]);
  //   console.log(callsById[call].members_needed);
  // }

  // now we need the sum of members needed for all calls for each classification
  const uniqueJobsByClassification = {};
  for (let id in callsById) {
    const { members_needed, instances } = callsById[id];
    const { member_class } = instances[0];
    // make sure to spread here! sort doesn't return a new array and will mutate the original
    const sorted = [...members_needed].sort((a, b) => b - a);

    if (uniqueJobsByClassification.hasOwnProperty(member_class)) {
      uniqueJobsByClassification[member_class] += sorted[0];
    } else {
      uniqueJobsByClassification[member_class] = sorted[0];
    }
  }


  // uniqueJobsByClassification now has the totals by classification for ONLY UNIQUE JOBS
  console.log('uniqueJobsByClassification :>> ', uniqueJobsByClassification);

  //THERE ARE IN FACT CASES WHERE AFTER MEMBERS TAKE CALLS, THE CALL PERSISTS AND APPEARS A LATER DAY WITH AN INCREASED NUMBER OF MEMBERS NEEDED!!!!!!
  //THIS MEANS WE NEED TO ANALYZE THE ARRAY OF MEMBERS NEEDED TO DEDUCE THE ACTUAL REAL JOBS CREATED!!!
  //THIS ONE RIGHT HERE!!!!
  console.log('callsById["59955 S"] :>> ', callsById["59955 S"]);
  // [3, 1, 2, 2, 2, 2]
  // 3 real jobs at first,
  // 2 get picked up
  // 1 remains
  // 1 gets added the next day
  // total, 4 real jobs
}
