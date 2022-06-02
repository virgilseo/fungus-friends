<template>
  <div class="home">
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error...</p>
    <FilterMushrooms
      v-if="mushroomsLoaded"
      :sort="sortMushroms" :choices="colorChoices"
      :mushrooms="mushrooms" :type="'color'"/>
    <FilterMushrooms
      v-if="mushroomsLoaded"
      :sort="sortMushroms" :choices="spotChoices"
      :mushrooms="mushrooms" :type="'spots'"/>
    <MapContainer v-if="mushroomsLoaded" :mushrooms="mushrooms" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MapContainer from '@/components/Map/MapContainer.vue'
import mushrooms, { Spots, Color } from '@/api/front-end api.ts'
import FilterMushrooms from '@/components/Map/FilterMushrooms.vue'

type Choice = {
  name: string,
  selected: boolean
}

export default defineComponent({
  name: 'Home',
  components: {
    MapContainer,
    FilterMushrooms
  },
  data () {
    return {
      allMushrooms: [{}],
      mushrooms: [{}],
      mushroomsLoaded: false,
      error: false,
      loading: false,
      colorChoices: [
        { name: 'red', selected: false },
        { name: 'green', selected: false },
        { name: 'yellow', selected: false },
        { name: 'blue', selected: false }
      ],
      spotChoices: [
        { name: 'none', selected: false },
        { name: 'hidden', selected: false },
        { name: 'dotted', selected: false },
        { name: 'dashed', selected: false },
        { name: 'solid', selected: false },
        { name: 'double', selected: false },
        { name: 'grove', selected: false },
        { name: 'ridge', selected: false },
        { name: 'inset', selected: false },
        { name: 'outset', selected: false }
      ],
      color: Color,
      spots: Spots
    }
  },
  mounted () {
    this.getMushrooms()
  },
  methods: {
    getMushrooms (): void {
      this.loading = true
      mushrooms().then((result) => {
        this.mushrooms = result
        this.allMushrooms = result
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.mushroomsLoaded = true
          this.loading = false
        })
    },
    sortMushroms (choice: string, type: string): void {
      if (type === 'color') {
        const filteredMushrooms = this.allMushrooms.filter(
          (item: Record<string, Color>) => this.color[item.color].toLowerCase() === choice)
        this.mushrooms = filteredMushrooms
        this.removeChoices(this.spotChoices, 'color')
      } else {
        const filteredMushrooms = this.mushrooms.filter(
          (item: Record<string, Color>) => this.spots[item.spots].toLowerCase() === choice)
        this.mushrooms = filteredMushrooms
        this.removeChoices(this.colorChoices, 'spot')
      }
    },
    // Filter out choices from the second select boxes
    // Check the mushrooms that reamain on page and then filter the choices
    removeChoices (choices: Array<Choice>, type: string) {
      if (type === 'color') {
        const filteredChoices = choices.filter((spot: Choice) =>
          this.mushrooms.some((mushroom: Record<string, Spots>) =>
            spot.name === this.spots[mushroom.spots]
          )
        )
        this.spotChoices = filteredChoices
      } else {
        const filteredChoices = choices.filter((color: Choice) =>
          this.mushrooms.some((mushroom: Record<string, Spots>) =>
            color.name === this.color[mushroom.color].toLowerCase()
          )
        )
        this.colorChoices = filteredChoices
      }
    }
  }
})
</script>
