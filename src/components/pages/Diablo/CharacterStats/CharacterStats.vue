<script lang="ts">
export default {
  name: 'CharacterStats'
}
</script>

<script setup lang="ts">
import Character from "@/components/pages/Diablo/Character/Character.vue";

const characters = [
  { title: 'Barbarian',
    character: 'barbarian'
  },
  { title: 'Demon Hunter',
    character: 'demonHunter'
  },
  { title: 'Witch Doctorr',
    character: 'witchDoctor'
  },
  { title: 'Monk',
    character: 'monk'
  },
  { title: 'Wizard',
    character: 'wizard'
  }
]

</script>

<template>
  <div class="diablo-character-stats">
    <h2>Character Stats</h2>
    
    <div class="diablo-character-stats__characters">
      <Character
        v-for="character in characters"
        :key="character.title"
        :title="character.title"
        :character="character.character"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.diablo-character-stats {

  h2 {
    text-align: center;
  }
  
  &__characters {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
    justify-content: center;
    justify-items: center;
  }
  
  @include ui-mobile-only {
    &__characters {
      grid-gap: 20px;
      grid-template-columns: 1fr;
    }
  }
}
</style>