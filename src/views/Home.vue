<template>
  <div class="home">
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error...</p>
    <FilterMushrooms
      v-if="mushroomsLoaded"
      :sort="sortByColor" :choices="colorChoices"
      :mushrooms="mushrooms" :type="'color'"
      :reset="resetColors" :choice="spotsChoice"
      />
    <FilterMushrooms
      v-if="mushroomsLoaded"
      :sort="sortBySpots" :choices="spotChoices"
      :mushrooms="mushrooms" :type="'spots'"
      :reset="resetSpots" :choice="colorChoice"
      />
    <MapContainer v-if="mushroomsLoaded" :mushrooms="mushrooms" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MapContainer from '@/components/Map/MapContainer.vue'
import mushrooms, { Spots, Color } from '@/api/front-end api.ts'
import FilterMushrooms from '@/components/Map/FilterMushrooms.vue'
import { colorChoices, spotChoices, Choice } from '@/components/Map/FilterChoices'

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
      colorChoices: colorChoices,
      spotChoices: spotChoices,
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
    sortByColor (choice: Choice) {
      // Reset color choice signal
      this.resetChoiceIndicator(this.colorChoices, this.colorChoice)
      // Signal color choice
      choice.selected = true
      this.colorChoice = choice.name
      if (this.spotsChoice === '') {
        const filteredMushrooms = this.allMushrooms.filter(
          (item: Record<string, Color>) => this.color[item.color].toLowerCase() === choice.name)
        this.mushrooms = filteredMushrooms
        this.removeChoices(this.spotChoices, 'color')
      } else {
        // Take into account spots choice when filetring the mushrooms again
        const filteredMushrooms = this.allMushrooms.filter(
          (item: Record<string, Color>) => this.color[item.color].toLowerCase() === choice.name &&
          this.spots[item.spots].toLowerCase() === this.spotsChoice)
        this.mushrooms = filteredMushrooms
        this.removeChoices(this.spotChoices, 'color')
      }
    },
    sortBySpots (choice: Choice) {
      // Reset color choice signal
      this.resetChoiceIndicator(this.spotChoices, this.spotsChoice)
      choice.selected = true
      // Signal spot choice
      this.spotsChoice = choice.name
      if (this.colorChoice === '') {
        const filteredMushrooms = this.allMushrooms.filter(
          (item: Record<string, Spots>) => this.spots[item.spots].toLowerCase() === choice.name)
        this.mushrooms = filteredMushrooms
        this.removeChoices(this.colorChoices, 'spot')
      } else {
        // Take into account color choice when filetring the mushrooms again
        const filteredMushrooms = this.allMushrooms.filter(
          (item: Record<string, Spots>) => this.spots[item.spots].toLowerCase() === choice.name &&
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
    },
    resetColors (choices: Array<Choice>, choice: string) {
      this.resetChoiceIndicator(choices, this.colorChoice)
      this.colorChoice = ''
      this.colorChoices = colorChoices
      // Consider spot choice when reseting the filter
      if (this.spotsChoice === '') {
        this.mushrooms = this.allMushrooms
      } else {
        const filteredMushrooms = this.allMushrooms.filter(
          (item: Record<string, Spots>) => this.spots[item.spots].toLowerCase() === choice)
        this.mushrooms = filteredMushrooms
      }
    },
    resetSpots (choices: Array<Choice>, choice: string) {
      this.resetChoiceIndicator(choices, this.spotsChoice)
      this.spotsChoice = ''
      this.spotChoices = spotChoices
      // Consider spot choice when reseting the filter
      if (this.colorChoice === '') {
        this.mushrooms = this.allMushrooms
      } else {
        const filteredMushrooms = this.allMushrooms.filter(
          (item: Record<string, Spots>) => this.color[item.color].toLowerCase() === choice)
        this.mushrooms = filteredMushrooms
      }
    },
    resetChoiceIndicator (choices: Array<Choice>, filterChoice: string) {
      choices.filter((choice: Choice) => {
        return choice.name === filterChoice
      }).map((choice: Choice) => {
        choice.selected = false
      })
    }
  }
})
</script>
