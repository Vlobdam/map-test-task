<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class='h-[48px]'>
    <nav class='ml-2 flex h-full w-full items-center gap-3'>
      <RouterLink class='border-2 border-black border-solid' to="/">Map</RouterLink>
      <RouterLink class='border-2 border-black border-solid' to="/table">Table</RouterLink>
    </nav>
  </header>
  
  <main class="h-[calc(100%-48px)]">
    <RouterView />
  </main>
</template>

<style scoped>
  .router-link-active {
    background: #DDDDDD;
  }
</style>