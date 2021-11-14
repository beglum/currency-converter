<template>
  <canvas ref="chart"></canvas>
</template>

<script setup>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
);

const rateHistory = inject('rateHistory');
const converterParams = inject('converterParams');
const chart = ref(null);
let chartData = null;
const keys = computed(() => Object.keys(rateHistory.value));
const values = computed(() =>
  Object.values(rateHistory.value).map(
    (data) => data[converterParams.value[1].currencyName]
  )
);

watch(
  () => {
    return values.value;
  },
  () => {
    if (chartData) {
      chartData.data.labels = keys.value;
      chartData.data.datasets[0].data = values.value;
      chartData.update();
    }
  }
);

onMounted(() => {
  chartData = new Chart(chart.value, {
    type: 'line',
    data: {
      labels: keys.value,
      datasets: [
        {
          data: values.value,
          borderColor: 'rgb(75, 192, 192)',
        },
      ],
    },
  });
});
</script>
