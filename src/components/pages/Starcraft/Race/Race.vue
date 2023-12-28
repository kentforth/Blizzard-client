<script lang="ts">
export default {
  name: 'Race'
}
</script>

<script setup lang="ts">
import {
  ref,
  computed,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'

import { socket } from "@/services/socket";

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

const zerg = ref(null)
const terran = ref(null)
const protoss = ref(null)

const series = ref([111, 222, 444])
const chartOptions = ref( {
  labels: ["Terran", "Zerg", "Protoss"],
      colors: ["#379BFF", "#FF2323", "#60C121"],
      chart: {
    type: "donut",
        width: 380,
        foreColor: "#f4e2e2",
  },
  plotOptions: {
    pie: {
      startAngle: -90,
          endAngle: 270,
    },
  },
  dataLabels: {
    enabled: true,
  },
  fill: {
    type: "gradient",
  },
  legend: {
    formatter: function (val: number, opts: any) {
      return val + " - " + opts.w.globals.series[opts.seriesIndex];
    },
  },
  title: {
    text: "Army Units Quantity",
    align: 'center'
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 350,
        },
        legend: {
          position: "bottom",
        },
      },
    },
    {
      breakpoint: 320,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
})

const items = ref([
  {
    title: 'Terran',
    model: terran.value
  },
  {
    title: 'Zerg',
    model: zerg.value
  },
  {
    title: 'Protoss',
    model: protoss.value
  }
])

const isValid = computed(() => {
  if (
    (items.value[0].model === null || items.value[0].model === '') ||
    (items.value[1].model === null || items.value[1].model === '') ||
    (items.value[2].model === null || items.value[2].model === '')
) {
    return false
  }
  
  return true
})

onBeforeMount(() => {
  socket.on("starcraftArmyUnits", (data) => {
    series.value = data.map(Number);
  });
})

onBeforeUnmount(() => {
  socket.off('starcraftArmyUnits')
})

const onClick = () => {
  if (isValid.value) {
    const armyUnits = [
      items.value[0].model,
      items.value[1].model,
      items.value[2].model,
    ];
    socket.emit("starcraftChangeArmyUnits", armyUnits);
    
    return 
  }
  
  $toast.error('Number in all fields should be more than 0', {
    duration: 5000
  });
}
</script>

<template>
  <div class="starcraft-race">
    <div class="starcraft-race__inner">
      <div
        class="starcraft-race__item"
        v-for="item in items"
        :key="item.title"
      >
        <h2>{{ item.title }}</h2>
        <input
          type="number"
          v-model="item.model"
          class="starcraft-race__input"
        >
      </div>
    </div>
    
    <button
      class="starcraft-race__button"
      @click="onClick"
    >
      CREATE CHART
    </button>

    <apexchart
      ref="armyUnitsChart"
      type="donut"
      width="380"
      :series="series"
      :options="chartOptions"
      class="starcraft-race__chart"
    />
  </div>
</template>

<style scoped lang="scss">
.starcraft-race {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &__inner {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
  }
  
  &__item {
    display: flex;
    flex-direction: column;
    justify-items: center;align-items: center;
    
    h2 {
      margin-bottom: 10px;
    }
  }
  
  &__input {
    outline: none;
    font-size: 1.4rem;
    padding: 5px;
    border: 2px solid $purple;
    border-radius: 5px;
    background-color: transparent;
    color: $white;
    width: 80%;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  
  &__button {
    padding: 10px 50px;
    width: max-content;
    margin: 20px auto 0 auto;
    font-size: 1.2rem;
    color: $light-blue;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    border: 2px solid rgba(0, 77, 153, 0.6);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6), 0 8px 32px rgba(0, 0, 0, 0.4);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6);
    background-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.9),
            rgba(0, 51, 102, 0.9)
    );
    transition: color 0.2s, filter 0.2s, opacity 0.2s, transform 0.2s;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: 5px;
    font-family: "Modern Warfare Regular", "Open Sans", sans-serif;
    
    &:hover {
      filter: brightness(1.3);
      color: $white;
    }
    
    &:active {
      text-shadow: none;
      border: 2px solid hsla(0, 0%, 100%, 0.4);
      transform: scale(0.98);
    }
  }
  
  &__chart {
    margin-top: 20px;
  }
  
  @include ui-mobile-only {
    &__inner {
      grid-template-columns: 1fr;
    }
    
    &__input {
      margin-bottom: 20px;
    }
  }
}
</style>
