<template>
  <Loader v-if="loading" />
  <section v-else>
    <img :src="error ? placeholder : image" alt="placeholder">
    <h3>{{ mushroom.name }}</h3>
    <ul>
      <li>{{ color[mushroom.color].toLowerCase() }}</li>
      <li>{{ spots[mushroom.spots] }}</li>
    </ul>
  </section>
  <ErrorMsg v-if="error" :message="'Could not get your mushroom pick :('"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Spots, Color } from '@/api/front-end api.ts'
import { mapGetters } from 'vuex'
import Loader from '@/components/Reusable/Loader.vue'
import ErrorMsg from '@/components/Reusable/ErrorMsg.vue'

export default defineComponent({
  name: 'InfoBox',
  props: {
    mushroom: Object
  },
  components: {
    Loader,
    ErrorMsg
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
