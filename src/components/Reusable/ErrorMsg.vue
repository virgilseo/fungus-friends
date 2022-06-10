<template>
  <div
    class="error-container"
  >
    <span class="material-icons error-icon">error</span>
    <span>{{ message }}</span>
  </div>
</template>

<script lang="ts">

export default {
  name: 'ErrorMsg',
  props: {
    message: String
  }
}
</script>
