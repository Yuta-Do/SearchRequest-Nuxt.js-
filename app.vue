<script setup lang="ts">
</script>

<template>
  <div class="hello">
    <NuxtLink to = "/">Home</NuxtLink>
    <NuxtLink :to ="{name: 'about'}">about</NuxtLink>

    <NuxtPage />
  </div>
</template>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 2rem;
}
</style>