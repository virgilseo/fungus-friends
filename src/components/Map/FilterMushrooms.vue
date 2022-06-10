<template id="">
  <div class="filter-select"  @click="toggleChoices">
    <span class="material-icons filter-icon">sort</span>
    <span>{{ type }}</span>
  </div>
  <ul class="choice-list" v-if="showChoices">
    <span class="material-icons reset" @click="reset(choices, choice)">restore</span>
    <li
      v-for="(choice, i) in choices"  :key="i"
      @click="[sort(choice), toggleChoices()]"
      class="choice-item"
      :class="{'choice-selected' :choice.selected, 'choice-item': !choice.selected }"
      >
      {{ choice.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FilterMushrooms',
  props: {
    choices: Array,
    type: String,
    sort: Function,
    reset: Function,
    choice: String
  },
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
