<script setup>
</script>

<template>
  <div id="app">
    <!-- Optional Header -->
    <header class="app-header">
      <h1>Brewhaus</h1>
    </header>

    <!-- This is where Home.vue OR Details.vue will be rendered -->
    <router-view />
    
    <!-- Optional Footer -->
    <footer class="app-footer">
      <p>© 2026 Brewhaus</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
}
.app-header, .app-footer {
  padding: 1em;
  text-align: center;
  background-color: #f0f0f0;
}
</style>
