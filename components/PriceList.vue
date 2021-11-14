<template>
  <div class="price-list-component">
    <div class="price-list table">
      <div>
        <div class="row price-row border-radius">
          <div>{{ converterParams[0].currencyName }}</div>
          <div>{{ converterParams[1].currencyName }}</div>
        </div>
        <div
          v-for="(quantity, index) of sampleQuantityOfCurrency"
          :key="quantity"
          class="row price-row border-radius"
        >
          <div>{{ quantity }}</div>
          <div>{{ priceListFromBaseToTarget[index] }}</div>
        </div>
      </div>
      <div>
        <div class="row price-row border-radius">
          <div>{{ converterParams[1].currencyName }}</div>
          <div>{{ converterParams[0].currencyName }}</div>
        </div>
        <div
          v-for="(quantity, index) of sampleQuantityOfCurrency"
          :key="quantity"
          class="row price-row border-radius"
        >
          <div>{{ quantity }}</div>
          <div>{{ priceListFromTargetToBase[index] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const converterParams = inject('converterParams');
const { multiplyCurrencyQuantity, divideCurrencyQuantity } = useCalculation();

const sampleQuantityOfCurrency = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

const priceListFromBaseToTarget = computed(() => {
  return sampleQuantityOfCurrency.map((price) =>
    multiplyCurrencyQuantity(price, converterParams.value[1].multiplier || 1)
  );
});
const priceListFromTargetToBase = computed(() => {
  return sampleQuantityOfCurrency.map((price) =>
    divideCurrencyQuantity(price, converterParams.value[1].multiplier || 1)
  );
});
</script>

<style lang="scss" scoped>
.price-list {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  .price-row {
    display: grid;
    grid-template-columns: 1fr 1fr;

    & > div {
      padding: 0.1rem 1rem;
    }
  }
}
</style>
