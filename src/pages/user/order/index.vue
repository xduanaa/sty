<template>
  <div v-if="$route.query.id">
    <Detial  />
  </div>
  <div v-else>
    <AllOrder />
  </div>
</template>

<script setup>
import AllOrder from './allOrder/index.vue'
import Detial from './detail/index.vue'


</script>

<style scoped></style>
