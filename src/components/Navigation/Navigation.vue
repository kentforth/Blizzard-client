<script>
import wow from '../../assets/images/navigation/wow.png'
import diablo from '../../assets/images/navigation/diablo.png'
import overwatch from '../../assets/images/navigation/overwatch.png'
import starcraft from '../../assets/images/navigation/starcraft.png'
import heartstone from '../../assets/images/navigation/heartstone.png'

export default {
  name: "Navigation",
}
</script>

<script setup>
const links = [
  {
    to: { name: 'overwatch' },
    alt: 'overwatch',
    image: overwatch
  },
  {
    to: { name: 'starcraft' },
    alt: 'starcraft',
    image: starcraft
  },
  {
    to: { name: 'diablo' },
    alt: 'diablo',
    image: diablo
  },
  {
    to: { name: 'heartstone' },
    alt: 'heartstone',
    image: heartstone
  },
  {
    to: { name: 'wow' },
    alt: 'wow',
    image: wow
  }
]
</script>

<template>
  <div class="navigation">
    <div class="navigation__inner">
      <RouterLink
        v-for="link in links"
        :to="link.to"
        class="navigation__link"
        :key="link.alt"
      >
        <img
          :src="link.image"
          :alt="link.alt"
          class="navigation__image"
        >
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./Navigation.scss"></style>