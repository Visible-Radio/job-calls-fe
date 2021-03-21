export default function findDuplicates(callSheet) {
  //can't modify callSheet as it is a reference to callCardData

  /* move through the callCardData
  store the first union_call_id
  check it against every other call in the array of call objects
  on the first duplicate found, start a new duplicate object
  insert the company, dates and the indicies of callCardData where they were found

  on the next pass don't check the indexes we've already found duplicates at
  */

  let duplicates = {};
  // array of indicies not to check since we've already found dupes there
  let found = [];
  let totalDuplicateMembers = 0;

  for (let i = 0; i < callSheet.length; i++) {
    if (found.includes(i)) continue;
    let current = callSheet[i].union_call_id;

    for (let j = i + 1; j < callSheet.length; j++) {
      if (callSheet[j].union_call_id === current) {
        if (!duplicates[current]) {
          // start a new duplicate object
          duplicates[current] = {
            company: callSheet[j].company,
            duplicate_dates: [],
            duplicate_indicies: [],
            duplicate_members: callSheet[j].members_needed,
          }
          duplicates[current]
            .duplicate_dates
            .push(callSheet[i].call_date_from_html, callSheet[j].call_date_from_html);
          duplicates[current]
            .duplicate_indicies
            .push(i, j);
          found.push(j);
        } else {
          // push our values into the exisiting duplicate object
          duplicates[current]
            .duplicate_dates
            .push(callSheet[j].call_date_from_html);
          duplicates[current]
            .duplicate_indicies
            .push(j);
          duplicates[current]
            .duplicate_members
            += callSheet[j].members_needed;
          totalDuplicateMembers += callSheet[j].members_needed;
          found.push(j);
        }
      }
    }
  }
  return ({
    duplicates,
    found,
    count: found.length,
    totalDuplicateMembers
  });
}