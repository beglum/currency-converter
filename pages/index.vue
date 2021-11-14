<template>
  <div id="app">
    <article>
      <Section :hiddenable="false">
        <template v-slot:header>Конвертация валют</template>
        <template v-slot:content><Converter /></template>
      </Section>
      <Section>
        <template v-slot:header>Список стоимостей</template>
        <template v-slot:content><PriceList /></template>
      </Section>
      <Section>
        <template v-slot:header>История курса конвертации</template>
        <template v-slot:content><HistoryChart /></template>
      </Section>
    </article>
  </div>
</template>

<script setup>
const {
  currencyList,
  updateCurrenciesData,
  rateHistory,
  converterParams,
  updateCurrency,
  switchCurrency,
} = useConverter();

updateCurrenciesData();

provide('rateHistory', rateHistory);
provide('converterParams', converterParams);
provide('updateCurrency', updateCurrency);
provide('switchCurrency', switchCurrency);

provide('currencyList', currencyList);
</script>

<style lang="scss">
@import '~/assets/styles/main.scss';
</style>
