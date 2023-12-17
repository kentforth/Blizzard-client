<script lang="ts">
export default {
  name: 'Tank'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'

import { socket } from "@/services/socket";

import ball from '@/assets/images/overwatch/tanks/ball.png'
import diva from '@/assets/images/overwatch/tanks/diva.png'
import rein from '@/assets/images/overwatch/tanks/rein.png'
import zarya from '@/assets/images/overwatch/tanks/zarya.png'
import orisa from '@/assets/images/overwatch/tanks/orisa.png'
import sigma from '@/assets/images/overwatch/tanks/sigma.png'
import roadhog from '@/assets/images/overwatch/tanks/roadhog.png'
import winston from '@/assets/images/overwatch/tanks/winston.png'

const tanksSeries = ref([42, 47, 52, 58, 65, 45, 12, 54])

const tanksOptions = ref({
      chart: {
        width: 380,
        type: "polarArea",
      },
      labels: [
        "D.Va",
        "Orisa",
        "Reinhartd",
        "Roadhog",
        "Sigma",
        "Winston",
        "Wrecking Ball",
        "Zarya",
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
          color: "#EB222E",
          shadeIntensity: 0.6,
        },
      },
      tooltip: {}
    })

const images = [
  { image: ball, alt: 'ball', name: 'Ball'},
  { image: diva, alt: 'diva', name: 'Diva'},
  { image: orisa, alt: 'orisa', name: 'Orisa'},
  { image: rein, alt: 'rein', name: 'Rein'},
  { image: roadhog, alt: 'roadhog', name: 'Roadhog'},
  { image: sigma, alt: 'sigma', name: 'Sigma'},
  { image: winston, alt: 'winston', name: 'Winston'},
  { image: zarya, alt: 'zarya', name: 'Zarya'}
]

onBeforeMount(() => {
  socket.on("overwatchUsersChoiceTanks", (data) => {
    tanksSeries.value = data;
  });
})

onBeforeUnmount(() => {
  socket.off("overwatchUsersChoiceTanks");
})
</script>

<template>
  <div class="overwatch-tanks">
    <apexchart
      type="polarArea"
      height="350"
      :options="tanksOptions"
      :series="tanksSeries"
    />
    
    <div class="overwatch-tanks__images">
      <div
        v-for="image in images"
        :key="image.alt"
        class="overwatch-tanks__hero"
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

<style lang="scss" src="./Tank.scss"></style>