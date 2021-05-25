const fetchCallCardData = async (selectedClasses, start, end, selectedCompanies) => {
  const remote = 'https://evening-plateau-74700.herokuapp.com';
  // const remote = 'http://127.0.0.1:4000';

  if (Array.isArray(selectedCompanies) && selectedCompanies.length > 32) {
    alert('Please select no more than 32 companies')
    return 1;
  }

  const getData = async (url) => {
    const body = {
      "start": start,
      "end": end,
    }
    if (selectedClasses?.length > 0) {
      body.member_class = selectedClasses;
    }
    if (!selectedCompanies.includes('All Companies') && selectedCompanies.length) {
      body.company = selectedCompanies
    }

    return fetch(url, {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(response => {
      if (typeof response !== 'object') {
        throw response
      }
      return response;
    })
    .catch(console.log)
  }

  try {
    const callCardData = await getData(`${remote}`);
    return callCardData;
  } catch(e) {
    console.log(e);
    return 1;
  }
}

export default handleFetch;