<script lang="ts">
export default {
  name: 'Healer'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'

import { socket } from "@/services/socket";

import ana from '@/assets/images/overwatch/healers/ana.png'
import zen from '@/assets/images/overwatch/healers/zen.png'
import lucio from '@/assets/images/overwatch/healers/lucio.png'
import moira from '@/assets/images/overwatch/healers/moira.png'
import mercy from '@/assets/images/overwatch/healers/mercy.png'
import baptiste from '@/assets/images/overwatch/healers/baptiste.png'
import brigitte from '@/assets/images/overwatch/healers/brigitte.png'

const healersSeries = ref([42, 52, 65, 45, 12, 54, 73])

 const healersOptions = ref({
  chart: {
    width: 380,
        type: "polarArea",
  },
  labels: [
    "Ana",
    "Baptiste",
    "Brigitte",
    "Lucio",
    "Mercy",
    "Moira",
    "Zenyatta",
  ],
      fill: {
    opacity: 1,
  },
  stroke: {
    width: 1,
        colors: undefined,
  },
  yaxis: {
    show: false,
        labels: {
      formatter: function (val: number) {
        return val + "%";
      },
    },
  },
  legend: {
    position: "bottom",
        labels: {
      useSeriesColors: true,
    },
  },
  plotOptions: {
    polarArea: {
      rings: {
        strokeWidth: 0,
      },
    },
  },
  dataLabels: {
    dropShadow: {
      enabled: true,
    },
  },
  theme: {
    monochrome: {
      enabled: true,
          shadeTo: "light",
          color: "#95CA1A",
          shadeIntensity: 0.6,
    },
  },
  tooltip: {},
})

const images = [
  { image: ana, alt: 'ana', name: 'Ana'},
  { image: baptiste, alt: 'baptiste', name: 'Baptiste'},
  { image: brigitte, alt: 'brigitte', name: 'Brigitte'},
  { image: lucio, alt: 'lucio', name: 'Lucio'},
  { image: mercy, alt: 'mercy', name: 'Mercy'},
  { image: moira, alt: 'moira', name: 'Moira'},
  { image: zen, alt: 'zen', name: 'Zen'},
]

onBeforeMount(() => {
  socket.on("overwatchUsersChoiceHealers", (data) => {
    healersSeries.value = data;
  });
})

onBeforeUnmount(() => {
  socket.off("overwatchUsersChoiceHealers");
})
</script>

<template>
  <div class="overwatch-healer">
    <apexchart
      type="polarArea"
      height="350"
      :series="healersSeries"
      :options="healersOptions"
    />
    
    <div class="overwatch-healer__images">
      <div
        v-for="image in images"
        :key="image.alt"
        class="overwatch-healer__hero"
      >
        <img
          :alt="image.alt"
          :src="image.image"
        >
        <span>{{ image.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./Healer.scss"></style>