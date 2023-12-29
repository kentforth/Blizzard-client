<script lang="ts">
export default {
  name: 'Countries'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'

import { socket } from "@/services/socket";

const series = ref([20.71, 10.1, 8.67, 6.92, 5.91])

const chartOptions = ref({
  chart: {
    type: "polarArea",
        foreColor: "#f4e2e2",
  },
  dataLabels: {
    style: {
      fontSize: "22px",
    },
  },
  labels: ["United States", "Germany", "Russia", "France", "Brazil"],
      colors: ["#F85C67", "#181818", "#419AFF", "#B675F8", "#12A01B"],
      stroke: {
    colors: ["#f4e2e2"],
  },
  yaxis: {
    show: false,
        labels: {
      formatter: function (val) {
        return val + "%";
      },
    },
  },
  fill: {
    opacity: 0.8,
  },
  legend: {
    fontSize: "16px",
  },
  tooltip: {
    style: {
      fontSize: "16px",
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

const damageSeries = ref([
  {
    name: "Damage",
    data: [
      5.768,
      4.238,
      7.324,
      2.372,
      4.538,
      4.56,
      5.328,
      6.214,
      4.516,
      7.201,
      4.885,
      3.459,
    ],
  },
])

const damageChartOptions = ref({
  chart: {
    foreColor: "#f4e2e2",
  },
  plotOptions: {
    bar: {
      columnWidth: "70%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
    borderColor: "#63FCC4",
  },
  grid: {
    row: {
      colors: ["#949494", "#717171"],
    },
  },
  xaxis: {
    labels: {
      rotate: -45,
    },
    categories: [
      "Holyspawn",
      "Devo",
      "Keiler",
      "ArchMennon",
      "MelianZord",
      "BryanAngel",
      "Jinx",
      "RXT",
      "Kylabra",
      "FarAway",
      "DeliCooper",
      "Mole",
    ],
    tickPlacement: "on",
  },
  yaxis: {
    title: {
      text: "Damage",
    },
  },
  fill: {
    colors: ["#FCFA1E"],
    type: "gradient",
    gradient: {
      shade: "light",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#BD3619"],
      inverseColors: false,
      opacityFrom: 0.85,
      opacityTo: 0.8,
      stops: [50, 100],
    },
  },
  tooltip: {
    theme: "dark",
  },
})

onBeforeMount(() => {
  socket.on("diabloTopCountriesDiablo", (data) => {
    series.value = data;
  })

  socket.on("diabloTopDamagePlayersDiablo", (data) => {
    damageSeries.value[0].data = data;
  })
})

onBeforeUnmount(() => {
  socket.off('diabloTopCountriesDiablo')
})
</script>

<template>
  <div class="diablo-countries">
    <div class="diablo-countries__item">
      <h2>Top countries playing Diablo 3</h2>

      <apexchart
        type="polarArea"
        :options="chartOptions"
        :series="series"
        width="400"
        class="diablo-countries__chart"
      />
    </div>
    
    <div class="diablo-countries__item">
      <h2>Top Damage Players</h2>

      <apexchart
        type="bar"
        height="250"
        class="diablo-countries__chart"
        :series="damageSeries"
        :options="damageChartOptions"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.diablo-countries {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  
  &__item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  &__chart {
    margin-top: 10px;
  }
  
  @include ui-mobile-only {
    grid-template-columns: 1fr;
    
    &__item {
      margin-bottom: 20px;
    }
  }
}
</style>