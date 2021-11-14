import https from 'https';
import url from 'url';

const fixUSD = function (data) {
  const result = {};
  for (const [date, history] of Object.entries(data)) {
    data[date] = {
      USD: 1,
      ...history,
    };
  }
  return data;
};

export default (req, res) => {
  const getProps = url.parse(req.url, true).query;
  return new Promise((response, reject) => {
    const getParams = [];
    const token = process.env.API_TOKEN;
    getParams.push(`apikey=${token}`);
    let baseCurrency = 'USD';
    if (getProps.currency) {
      baseCurrency = getProps.currency;
    }
    getParams.push(`base_currency=${baseCurrency}`);

    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate();
    const dateFrom = [year, month, (day - 10).toString().padStart(2, '0')].join(
      '-'
    );
    const dateTo = [year, month, day.toString().padStart(2, '0')].join('-');

    getParams.push(`date_from=${dateFrom}`);
    getParams.push(`date_to=${dateTo}`);

    let queryString = '?' + getParams.join('&');

    const uri = `https://freecurrencyapi.net/api/v2/historical${queryString}`;
    let data = '';

    https
      .get(uri, (resp) => {
        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          try {
            const historicalData = JSON.parse(data).data;
            response(fixUSD(historicalData));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', (e) => {
        reject(e);
      });
  });
};
