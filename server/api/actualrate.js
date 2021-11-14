import https from 'https';
import url from 'url';

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

    let queryString = '?' + getParams.join('&');

    const uri = `https://freecurrencyapi.net/api/v2/latest${queryString}`;
    let data = '';

    https
      .get(uri, (resp) => {
        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          try {
            const currencyList = JSON.parse(data).data;

            // По какой-то причине отсутствует USD в ответе, если базовым был выбран USD.
            // Поэтому добавляем вручную
            response({
              USD: 1,
              ...currencyList,
            });
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
