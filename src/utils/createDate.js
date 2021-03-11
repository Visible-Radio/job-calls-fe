// nice little function grabbed from Stack Overflow
// https://stackoverflow.com/questions/37002681/subtract-days-months-years-from-a-date-in-javascript/37002800

export function createDate(days, months, years) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);
  return date;
}