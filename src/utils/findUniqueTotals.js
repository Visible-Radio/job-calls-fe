export default function findUniqueTotals(callCardData) {
  // look through callCardData
  // create a unique set of job calls where any given union call id appears only once
  // if a union call id appears multiple times, return the one with the largest number of members needed
  // then find the total actual jobs created for each classification

  // we could also include an array of the dates on which the call appeared,
  // or the first and last dates it appeared

  // object from an array of objects where we use one of the object's properties as its key
  const uniques = {};
  callCardData.forEach((call) => {
    if (
      uniques.hasOwnProperty(call.union_call_id) &&
      uniques[call.union_call_id].members_needed < call.members_needed
    ) {
      // only overwrite a call if the members needed value is larger
      uniques[call.union_call_id] = call;
    } else if (!uniques.hasOwnProperty(call.union_call_id)) {
      // if we don't already have this call add it
      uniques[call.union_call_id] = call;
    }
  });

  // uniques now only has the unique job calls with the largest members needed value.
  // console.log("uniques :>> ", uniques);

  // now we need the sum of members needed for all calls for each classification
  const uniqueJobsByClassification = {};
  for (let call in uniques) {
    if (uniqueJobsByClassification.hasOwnProperty(uniques[call].member_class)) {
      uniqueJobsByClassification[uniques[call].member_class] +=
        uniques[call].members_needed;
    } else {
      uniqueJobsByClassification[uniques[call].member_class] =
        uniques[call].members_needed;
    }
  }

  // uniqueJobsByClassification now has the totals by classification for ONLY UNIQUE JOBS
  console.log("uniqueJobsByClassification :>> ", uniqueJobsByClassification);
}
