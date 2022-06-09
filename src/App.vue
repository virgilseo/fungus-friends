<template>
  <Header />
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Globals/Header.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header
  }
})
</script>
<style>
@import "./assets/stylesheets/app.css";
</style>
