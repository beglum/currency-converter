<template>
  <div>
    <div class="form-control">
      <select
        class="currency"
        v-model="currency.currencyName"
        @change="localUpdateCurrency('currencyName')"
      >
        <option v-for="name of currencyList" :key="name" :value="name">
          {{ name }}
        </option>
      </select>
      <input
        type="number"
        v-model="currency.quantity"
        @input="localUpdateCurrency('quantity')"
      />
    </div>
    <div class="subtitle">
      {{ unitCostHint }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  index: Number,
  currency: Object,
});
const { index, currency } = toRefs(props);

const converterParams = inject('converterParams');
const updateCurrency = inject('updateCurrency');

const localUpdateCurrency = function (paramName) {
  updateCurrency(index.value, paramName, currency.value[paramName]);
};

const currencyList = inject('currencyList');

const { multiplyCurrencyQuantity, divideCurrencyQuantity } = useCalculation();

const calculator = index.value
  ? multiplyCurrencyQuantity
  : divideCurrencyQuantity;

const unitCost = computed(() => {
  return calculator(1, converterParams.value[1].multiplier || 1);
});

const unitCostHint = computed(() => {
  const firstCurrency = converterParams.value[+!index.value].currencyName;
  const secondCurrency = converterParams.value[+index.value].currencyName;
  return `1 ${firstCurrency} = ${unitCost.value} ${secondCurrency}`;
});
</script>

<style lang="scss" scoped>
.currency {
  width: 150px;
}
.subtitle {
  margin-right: 1rem;
  text-align: right;
}
</style>
