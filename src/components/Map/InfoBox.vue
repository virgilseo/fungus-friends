<template>
  <img src="https://images.unsplash.com/photo-1645907585204-03769583ae48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ0OTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTQ1MDYyOTc&ixlib=rb-1.2.1&q=80&w=200" alt="placeholder">
  <h3>{{ mushroom.name }}</h3>
  <ul>
    <li>{{ color[mushroom.color].toLowerCase() }}</li>
    <li>{{ spots[mushroom.spots] }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Spots, Color, Mushroom } from '@/api/front-end api.ts'

export default defineComponent({
  name: 'InfoBox',
  props: {
    mushroom: Object
  },
  data () {
    return {
      color: Color,
      spots: Spots
    }
  }
})

</script>
