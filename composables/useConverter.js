import useCalculation from './useCalculation';
import useApi from './useApi';

export default function () {
  const { fetchActualRate, fetchRateHistory } = useApi();
  const { multiplyCurrencyQuantity, divideCurrencyQuantity } = useCalculation();

  /**
   * Параметры конвертера
   */
  const chosenCurrencies = reactive([
    {
      currencyName: 'USD',
      quantity: 1,
    },
    {
      currencyName: 'RUB',
      quantity: 1,
    },
  ]);
  const converterParams = computed(() => {
    return chosenCurrencies.map((currency) => {
      return {
        ...currency,
        multiplier: actualRate.value[currency.currencyName],
      };
    });
  });
  const updateCurrency = function (index, param, value) {
    chosenCurrencies[index][param] = value;
    updateDependentCurrencies(param, index);
  };
  const silentUpdateCurrency = function (index, param, value) {
    chosenCurrencies[index][param] = value;
  };
  const switchCurrency = function () {
    const baseCurrency = chosenCurrencies[0].currencyName;
    const currencyName = chosenCurrencies[1].currencyName;
    chosenCurrencies[0].currencyName = currencyName;
    chosenCurrencies[1].currencyName = baseCurrency;

    updateCurrenciesData();
  };

  const updateDependentCurrencies = function (paramName, changedParamIndex) {
    const baseCurrency = converterParams.value[0];
    const otherCurrency = converterParams.value.slice(1);
    const isBase = !changedParamIndex;

    if (isBase) {
      if (paramName === 'quantity') {
        otherCurrency.forEach((currency, index) => {
          silentUpdateCurrency(
            index + 1,
            'quantity',
            multiplyCurrencyQuantity(baseCurrency.quantity, currency.multiplier)
          );
        });
      }
      if (paramName === 'currencyName') {
        updateCurrenciesData();
      }
    } else {
      const currentCurrency = otherCurrency[changedParamIndex - 1];
      if (paramName === 'quantity') {
        silentUpdateCurrency(
          0,
          'quantity',
          divideCurrencyQuantity(
            currentCurrency.quantity,
            currentCurrency.multiplier
          )
        );
      }
      if (paramName === 'currencyName') {
        silentUpdateCurrency(
          changedParamIndex,
          'quantity',
          multiplyCurrencyQuantity(
            baseCurrency.quantity,
            currentCurrency.multiplier
          )
        );
      }
    }
  };

  /**
   * Актуальные данные курса валют
   */
  const actualRate = ref({});
  const currencyList = computed(() => Object.keys(actualRate.value));
  const updateActualRate = function (currency) {
    const result = fetchActualRate(currency);

    result.then((data) => {
      actualRate.value = data;
      updateCurrency(0, 'quantity', chosenCurrencies[0].quantity);
    });
  };

  const rateHistory = ref({});
  const updateRateHistory = function (currency) {
    const result = fetchRateHistory(currency);

    result.then((data) => {
      rateHistory.value = data;
    });
  };

  const updateCurrenciesData = function () {
    const currencyName = chosenCurrencies[0].currencyName;
    updateActualRate(currencyName);
    updateRateHistory(currencyName);
  };

  return {
    currencyList,
    converterParams,
    rateHistory,
    switchCurrency,
    updateCurrency,
    updateCurrenciesData,
  };
}
