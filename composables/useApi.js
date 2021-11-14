export default function () {
  function toQueryString(params) {
    const paramList = [];
    for (const [key, value] of Object.entries(params)) {
      paramList.push(`${key}=${value}`);
    }

    let queryString = '';
    if (paramList.length) {
      queryString = '?' + paramList.join('&');
    }

    return queryString;
  }

  const fetchData = {
    get: function (options) {
      const queryParam = toQueryString(options.body);
      const url = `${options.url}${queryParam}`;

      return $fetch(url);
    },
  };

  const fetchActualRate = function (currency) {
    return new Promise((resolve, reject) => {
      const result = fetchData.get({
        url: '/api/actualrate',
        body: { currency },
      });

      result
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const fetchRateHistory = function (currency) {
    return new Promise((resolve, reject) => {
      const result = fetchData.get({
        url: '/api/history',
        body: { currency },
      });

      result
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return { fetchActualRate, fetchRateHistory };
}
