export const getData = (url, body) => {
  return new Promise( async(resolve, reject) => {
    // check number of selected companies - back end only allows 32 at a time

    if (body.member_class?.length < 1) {
      delete body.member_class
    }
    if (body.company?.length < 1) {
      delete body.company
    }

    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      // const parsedResponse = await response.json();
      resolve(await response.json());

    } catch (error) {
      console.error(error.message);
      reject([]);
    }

  })
}

// the data for trend graph for member requests needs to be formatted
export const prepareDatasets = (response) => {
  const keys = Object.keys(response[0]);
  const datasets = {};
  keys.forEach((key) => (datasets[key] = []));
  response.forEach((obj) => {
    for (let key in obj) {
      datasets[key].push(obj[key]);
    }
  });
  return datasets;
};
