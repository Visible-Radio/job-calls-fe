export default function findUniqueTotals(callCardData) {
  // The purpose of this function is to find the total actual jobs created for each classification in the given range.
  // The difficulty is that calls may persist for several days, and companies may revise the number of members requested over time.
  // As in this array, representing the members requested for a given union_call_id :[3, 1, 2, 2, 2, 2]
  // This actually represents 4 unique jobs
  // The company originally asks for 3.  2 get picked up, and then they revise the request to ask for another member.

  // object from an array of objects where we use one of the object's properties as its key
  const callsById = {};
  callCardData.forEach((call) => {
    if (callsById.hasOwnProperty(call.union_call_id)) {
      callsById[call.union_call_id].instances.push(call);
      callsById[call.union_call_id].members_needed.push(call.members_needed);
    } else {
      // create an object referred to by the current union_call_id
      callsById[call.union_call_id] = {
        instances: [call],
        members_needed: [call.members_needed],
      };
    }
  });

  // now we need the sum of members needed for all calls for each classification
  const uniqueJobsByClassification = {};
  for (let id in callsById) {
    const { members_needed, instances } = callsById[id];
    const { member_class } = instances[0];
    // travesrse the members_needed array to determine number of real jobs for the lifecycle of the call
    const realJobsCreated = countRealJobs([...members_needed]);

    if (uniqueJobsByClassification.hasOwnProperty(member_class)) {
      uniqueJobsByClassification[member_class] += realJobsCreated;
    } else {
      uniqueJobsByClassification[member_class] = realJobsCreated;
    }
  }

  // This function analyzes the members_needed array for a given union_call_id and determines for that call how many actual jobs were available
  function countRealJobs(members_needed) {
    return members_needed.reduce((acc, memberRequest, i, arr) => {
      if (memberRequest > arr[i - 1]) {
        const increase = memberRequest - arr[i - 1];
        return acc + increase;
      }
      return acc;
    }, members_needed[0]);
  }

  return {
    uniqueJobsByClassification,
    callsById
  }
}
