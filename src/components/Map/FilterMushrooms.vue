<template id="">
  <div class="">
    <span>filter</span>
    <span>by {{ type }}</span>
  </div>
  <ul>
    <li
      v-for="(choice, i) in choices"  :key="i"
      @click="sort(choice.name)"
      >
      {{ choice.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Color, Mushroom } from '@/api/front-end api.ts'

export default defineComponent({
  name: 'FilterMushrooms',
  props: ['choices', 'type', 'sort', 'mushrooms'],
  data () {
    return {
      showChoices: false,
      color: Color
    }
  }
})

</script>
