<template>
  <div
    class="error-container"
  >
    <span class="material-icons ">error</span>
    <span class="error-msg">{{ message }}</span>
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
