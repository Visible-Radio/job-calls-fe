export default function validateBody(body) {
  const companies = body.company ? body.company : []
  if (
    Array.isArray(companies) &&
    companies.length > 32
  ) {
    alert("Please select no more than 32 companies");
    return false;
  } else {
    return true;
  }
}