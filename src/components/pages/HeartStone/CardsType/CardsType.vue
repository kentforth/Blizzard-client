<script lang="ts">
export default {
  name: 'CardsType'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'

import { socket } from "@/services/socket";

import greeBg from '@/assets/images/heartstone/green-bg.jpg'
import grayBg from '@/assets/images/heartstone/gray-bg.jpg'
import yellowBg from '@/assets/images/heartstone/yellow-bg.jpg'
import orangeBg from '@/assets/images/heartstone/orange-bg.jpg'

const series = ref([44, 25, 54, 12])

const chartOptions = ref({
  chart: {
    width: 380,
        type: "pie",
        foreColor: "#f4e2e2",
  },
  labels: ["FREE", "COMMON", "RARE", "LEGENDARY"],
      colors: ["#6D9D47", "#818181", "#F9D304", "#FD7800"],
      fill: {
    type: "image",
        opacity: 0.85,
        image: {
      src: [
        greeBg,
        grayBg,
        yellowBg,
        orangeBg,
      ],
          width: 25,
          imagedHeight: 25,
    },
  },
  stroke: {
    width: 2,
  },
  dataLabels: {
    enabled: true,
        style: {
      colors: ["#111"],
    },
    background: {
      enabled: true,
          foreColor: "#fff",
          borderWidth: 0,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
})

onBeforeMount(() => {
  socket.on("heartstoneCardsType", (cardsType) => series.value = cardsType);
})

onBeforeUnmount(() => socket.off('heartstoneCardsType'))
</script>

<template>
  <div class="heartstone-cards-type">
    <h2>Cards Type</h2>

    <apexchart
      type="pie"
      width="380"
      :series="series"
      :options="chartOptions"
      class="heartstone-cards-type__chart"
    />
  </div>
</template>

<style lang="scss" scoped>
.heartstone-cards-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &__chart {
    margin-top: 10px;
  }
}
</style>