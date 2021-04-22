const handleFetch = async (selectedClasses, start, end, selectedCompanies) => {
  const remote = 'https://evening-plateau-74700.herokuapp.com';
  // const remote = 'http://127.0.0.1:4000';

  const getData = async (url) => {
    const body = {
      "start": start,
      "end": end,
    }
    if (selectedClasses?.length > 0) {
      body.member_class = selectedClasses;
    }
    if (!selectedCompanies.includes('All Companies')) {
      body.company = selectedCompanies;
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

  const prepareDatasets = (response) => {
    const keys = Object.keys(response[0]);
    const datasets = {};
    keys.forEach(key => datasets[key] = []);
    response.forEach(obj => {
      for (let key in obj) {
        datasets[key].push(obj[key]);
      }
    })
    return datasets;
  }

  try {
    const companies = await fetch(`${remote}/companies`)
    .then(res => res.json());

    const callCardData = await getData(`${remote}`);

    const chartData = prepareDatasets(await
      getData(`${remote}/members_needed_by_date`)
    );

    return {
      callCardData,
      chartData,
      companies,
    }

  } catch(e) {
    console.log(e);
    return 1;
  }
}

export default handleFetch;