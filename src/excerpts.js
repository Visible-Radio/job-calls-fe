import { useState, useEffect } from 'react';

const handleFetch = async (clicked, start, end, company) => {
  const getData = async (url) => {
    const body = {
      "start": start || "2020-12-07",
      "end": end || "2020-12-31",
    }
    if (clicked?.length > 0) {
      body.member_class = clicked;
    }
    if (company?.length) {
      body.company = company;
    }
    return fetch(url, {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(response => response.json())
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

  const callCardData =  await
    getData('https://evening-plateau-74700.herokuapp.com/');

  const chartData = prepareDatasets(await
    getData('https://evening-plateau-74700.herokuapp.com/members_needed_by_date')
  );

  return {
    callCardData,
    chartData,
  }

}

export default handleFetch;







import { useState, useEffect } from 'react';

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

function HandleFetch(clicked, start, end, company){
  const [callCardData, setCallCardData] = useState();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    (async function() {
      const getData = async (url) => {
        const body = {
          "start": start || "2020-12-07",
          "end": end || "2020-12-31",
        }
        if (clicked?.length) {
          body.member_class = clicked;
        }
        if (company?.length) {
          body.company = company;
        }
        return fetch(url, {
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(body)
        })
        .then(response => response.json())
        .catch(error => console.log(error));
      }

      setCallCardData(await
        getData('https://evening-plateau-74700.herokuapp.com/')
      );
      setChartData(prepareDatasets(await
        getData('https://evening-plateau-74700.herokuapp.com/members_needed_by_date')
        )
      )
    })();
  }, [clicked, start, end, company]);

  return {
    callCardData,
    chartData,
  }
}

export default HandleFetch;


