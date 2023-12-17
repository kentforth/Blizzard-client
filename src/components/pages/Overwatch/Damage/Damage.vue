<script lang="ts">
export default {
  name: 'Damage'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'

import { socket } from "@/services/socket";

import mei from '@/assets/images/overwatch/damage/mei.png'
import ashe from '@/assets/images/overwatch/damage/ashe.png'
import echo from '@/assets/images/overwatch/damage/echo.png'
import torb from '@/assets/images/overwatch/damage/torb.png'
import genji from '@/assets/images/overwatch/damage/genji.png'
import hanzo from '@/assets/images/overwatch/damage/hanzo.png'
import widow from '@/assets/images/overwatch/damage/widow.png'
import mcree from '@/assets/images/overwatch/damage/mcree.png'
import reaper from '@/assets/images/overwatch/damage/reaper.png'
import pharah from '@/assets/images/overwatch/damage/pharah.png'
import sombra from '@/assets/images/overwatch/damage/sombra.png'
import tracer from '@/assets/images/overwatch/damage/tracer.png'
import bastion from '@/assets/images/overwatch/damage/bastion.png'
import junkrat from '@/assets/images/overwatch/damage/junkrat.png'
import soldier from '@/assets/images/overwatch/damage/soldier.png'
import doomfist from '@/assets/images/overwatch/damage/doomfist.png'
import symmetra from '@/assets/images/overwatch/damage/symmetra.png'

const dpsSeries = ref([
  42,
  47,
  52,
  58,
  65,
  45,
  12,
  54,
  72,
  73,
  95,
  22,
  18,
  62,
  73,
  38,
  14,
])

    const dpsOptions = ref({
  chart: {
    width: 380,
        type: "polarArea",
  },
  labels: [
    "Ashe",
    "Bastion",
    "Doomfist",
    "Echo",
    "Genji",
    "Hanzo",
    "Junkrat",
    "Macree",
    "Mei",
    "Pharah",
    "Reaper",
    "Soldier",
    "Sombra",
    "Symmetra",
    "Torbjorn",
    "Tracer",
    "Widow",
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
          color: "#2E51A3",
          shadeIntensity: 0.6,
    },
  },
  tooltip: {},
})

const images = [
  { image: ashe, alt: 'ashe', name: 'Ashe'},
  { image: bastion, alt: 'bastion', name: 'Bastion'},
  { image: doomfist, alt: 'doomfist', name: 'Doomfist'},
  { image: echo, alt: 'echo', name: 'Echo'},
  { image: genji, alt: 'genji', name: 'Genji'},
  { image: hanzo, alt: 'hanzo', name: 'Hanzo'},
  { image: junkrat, alt: 'junkrat', name: 'Junkrat'},
  { image: mcree, alt: 'mcree', name: 'Mcree'},
  { image: mei, alt: 'mei', name: 'Mei'},
  { image: pharah, alt: 'pharah', name: 'Pharah'},
  { image: reaper, alt: 'reaper', name: 'Reaper'},
  { image: soldier, alt: 'soldier', name: 'Soldier'},
  { image: sombra, alt: 'sombra', name: 'Sombra'},
  { image: symmetra, alt: 'symmetra', name: 'Symmetra'},
  { image: torb, alt: 'torb', name: 'Torb'},
  { image: tracer, alt: 'tracer', name: 'Tracer'},
  { image: widow, alt: 'widow', name: 'Widow'},
]

onBeforeMount(() => {
  socket.on("overwatchUsersChoiceDPS", (data) => {
    dpsSeries.value = data;
  });
})

onBeforeUnmount(() => {
  socket.off("overwatchUsersChoiceDPS");
})
</script>

<template>
  <div class="overwatch-damage">
    <apexchart
      type="polarArea"
      height="350"
      :options="dpsOptions"
      :series="dpsSeries"
    />
    
    <div class="overwatch-damage__images">
      <div
        v-for="image in images"
        :key="image.alt"
        class="overwatch-damage__hero"
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

<style lang="scss" src="./Damage.scss"></style>