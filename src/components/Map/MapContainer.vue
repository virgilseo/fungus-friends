<template>
  <l-map style="height: 650px " :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution">
    </l-tile-layer>
    <l-marker
      v-for="(mushroom, i) in mushrooms"  :key="i"
      :lat-lng="mushroom.latlng"
      >
      <l-popup>
        <ul>
          <li>{{ mushroom.name }}</li>
          <li>{{ mushroom.color }}</li>
          <li>{{ mushroom.spots }}</li>
        </ul>
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

export default defineComponent({
  name: 'MapContainer',
  props: {
    mushrooms: Array
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 16,
      center: [52.080678, 5.236457],
      markerLatLng: [52.080678, 5.236457]
    }
  }
})

</script>
