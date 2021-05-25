const fetchCompanies = async () => {
  const remote = 'https://evening-plateau-74700.herokuapp.com';
  // const remote = 'http://127.0.0.1:4000';

  try {
    const companies = await fetch(`${remote}/companies`)
    .then(res => res.json());
    return companies;
  } catch(e) {
    console.log(e);
    return 1;
  }
}

export default fetchCompanies;