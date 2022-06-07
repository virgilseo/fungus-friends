<template>
  <div class="home">
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error...</p>
    <FilterMushrooms
      v-if="mushroomsLoaded"
      :sort="sortByColor" :choices="colorChoices"
      :mushrooms="mushrooms" :type="'color'"/>
    <FilterMushrooms
      v-if="mushroomsLoaded"
      :sort="sortBySpots" :choices="spotChoices"
      :mushrooms="mushrooms" :type="'spots'"/>
    <MapContainer v-if="mushroomsLoaded" :mushrooms="mushrooms" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MapContainer from '@/components/Map/MapContainer.vue'
import mushrooms, { Spots, Color, Mushroom } from '@/api/front-end api.ts'
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
        { name: 'groove', selected: false },
        { name: 'ridge', selected: false },
        { name: 'inset', selected: false },
        { name: 'outset', selected: false }
      ],
      color: Color,
      spots: Spots,
      colorChoice: '',
      spotsChoice: ''
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
    sortByColor (choice: string) {
      // Signal color choice
      this.colorChoice = choice
      if (this.spotsChoice === '') {
        const filteredMushrooms = this.allMushrooms.filter(
          (item: Record<string, Color>) => this.color[item.color].toLowerCase() === choice)
        this.mushrooms = filteredMushrooms
        this.removeChoices(this.spotChoices, 'color')
      } else {
        // Take into account spots choice when filetring the mushrooms again
        const filteredMushrooms = this.allMushrooms.filter(
          (item: Record<string, Color>) => this.color[item.color].toLowerCase() === choice &&
          this.spots[item.spots].toLowerCase() === this.spotsChoice)
        this.mushrooms = filteredMushrooms
        this.removeChoices(this.spotChoices, 'color')
      }
    },
    sortBySpots (choice: string) {
      // Signal spot choice
      this.spotsChoice = choice
      if (this.colorChoice === '') {
        const filteredMushrooms = this.allMushrooms.filter(
          (item: Record<string, Spots>) => this.spots[item.spots].toLowerCase() === choice)
        this.mushrooms = filteredMushrooms
        this.removeChoices(this.colorChoices, 'spot')
      } else {
        // Take into account color choice when filetring the mushrooms again
        const filteredMushrooms = this.allMushrooms.filter(
          (item: Record<string, Spots>) => this.spots[item.spots].toLowerCase() === choice &&
          this.color[item.color].toLowerCase() === this.colorChoice)
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
        this.spotChoices = [...filteredChoices]
      } else {
        const filteredChoices = choices.filter((color: Choice) =>
          this.mushrooms.some((mushroom: Record<string, Spots>) =>
            color.name === this.color[mushroom.color].toLowerCase()
          )
        )
        this.colorChoices = [...filteredChoices]
      }
    }
  }
})
</script>
