<template>
  <div class="loader">
    <div class="skeleton-card" v-for="n in 5" :key="n"></div>
  </div>
</template>

<style scoped>
.loader { display: flex; flex-wrap: wrap; gap: 1rem; }
.skeleton-card { width: 200px; height: 120px; background: #e0e0e0; border-radius: 8px; animation: pulse 1.2s infinite; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
</style>
