<template>
  <Header />
  <router-view/>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Globals/Header.vue'
import Footer from '@/components/Globals/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  }
})
</script>
<style>
@import "./assets/stylesheets/app.css";
</style>
