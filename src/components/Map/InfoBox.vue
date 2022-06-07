<template>
  <p v-if="loading">Loading...</p>
  <section v-else>
    <img :src="error ? placeholder : image" alt="placeholder">
    <h3>{{ mushroom.name }}</h3>
    <ul>
      <li>{{ color[mushroom.color].toLowerCase() }}</li>
      <li>{{ spots[mushroom.spots] }}</li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Spots, Color, Mushroom } from '@/api/front-end api.ts'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'InfoBox',
  props: {
    mushroom: Object
  },
  data () {
    return {
      color: Color,
      spots: Spots,
      placeholder: 'https://picsum.photos/200'
    }
  },
  computed: {
    ...mapGetters({
      image: 'infoBox/getImage',
      error: 'infoBox/getError',
      loading: 'infoBox/getLoading'
    })
  }
})

</script>
