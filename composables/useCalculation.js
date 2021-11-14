export default function () {
  function multiplyCurrencyQuantity(quantity, multiplier) {
    return (quantity * multiplier).toFixed(3);
  }

  function divideCurrencyQuantity(quantity, multiplier) {
    return (quantity / multiplier).toFixed(3);
  }

  return {
    multiplyCurrencyQuantity,
    divideCurrencyQuantity,
  };
}
