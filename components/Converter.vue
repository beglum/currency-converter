<template>
  <div class="converter">
    <div class="calculator">
      <div>
        <SelectCurrency :index="0" :currency="converterParams[0]" />
      </div>
      <div>
        <button
          class="btn transparent f-2 switch-button"
          @click="switchCurrency"
        ></button>
      </div>
      <div>
        <SelectCurrency :index="1" :currency="converterParams[1]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SelectCurrency from './Converter/SelectCurrency';

const converterParams = inject('converterParams');
const switchCurrency = inject('switchCurrency');
</script>

<style lang="scss" scoped>
.converter {
  .calculator {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;

    @media screen and (min-width: 600px) {
      grid-template-columns: 5fr 1fr 5fr;
    }

    & > div {
      display: flex;
      justify-content: center;
    }

    .switch-button::after {
      content: '⇅';
    }
    @media screen and (min-width: 600px) {
      .switch-button::after {
        content: '⇆';
      }
    }
  }
}
</style>
