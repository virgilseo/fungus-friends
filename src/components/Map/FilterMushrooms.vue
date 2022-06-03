<template id="">
  <div class=""  @click="toggleChoices">
    <span>filter</span>
    <span>by {{ type }}</span>
  </div>
  <ul v-if="showChoices">
    <li
      v-for="(choice, i) in choices"  :key="i"
      @click="sort(choice.name, type)"
      >
      {{ choice.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FilterMushrooms',
  props: ['choices', 'type', 'sort', 'mushrooms'],
  data () {
    return {
      showChoices: false
    }
  },
  methods: {
    toggleChoices () {
      !this.showChoices ? this.showChoices = true : this.showChoices = false
    }
  }
})

</script>
