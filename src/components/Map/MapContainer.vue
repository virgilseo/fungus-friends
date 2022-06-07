<template>
  <l-map style="height: 80VH " :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution">
    </l-tile-layer>
    <l-marker
      v-for="(mushroom, i) in mushrooms"  :key="i"
      :lat-lng="mushroom.latlng"
      @click="requestImage"
      >
      <l-popup>
        <InfoBox :mushroom="mushroom" />
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import { defineComponent } from 'vue'
import { Spots, Color } from '@/api/front-end api.ts'
import InfoBox from '@/components/Map/InfoBox.vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'MapContainer',
  props: {
    mushrooms: Array
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    InfoBox
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 17,
      center: [52.080678, 5.236457],
      spots: Spots,
      color: Color
    }
  },
  methods: {
    ...mapActions({
      requestImage: 'infoBox/requestImage'
    })
  }
})
</script>
