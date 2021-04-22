export default function validateDateInput(start, end) {
  // convert to date objects and compare to make sure end is later than start
  if (
    new Date(start) > new Date(end) ||
    start.length === 0 ||
    end.length === 0
  ) {
    alert("Invalid date input");
    return false;
  }
  return true;
}