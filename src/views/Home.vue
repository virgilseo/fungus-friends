<template>
  <div class="home">
    <MapContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MapContainer from '@/components/Map/MapContainer.vue'

export default defineComponent({
  name: 'Home',
  components: {
    MapContainer
  }
})
</script>
