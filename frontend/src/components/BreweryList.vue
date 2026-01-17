
<template>
  <div class="brewery-list">
    <div
      v-for="brewery in breweries"
      :key="brewery.id"
      class="brewery-card"
    >
      <h3>{{ brewery.name }}</h3>
      <p><strong>City:</strong> {{ brewery.city }}</p>
      <p><strong>State:</strong> {{ brewery.state }}</p>
      <p><strong>Type:</strong> {{ brewery.brewery_type }}</p>

      <router-link :to="`/brewery/${brewery.id}`">
        View Details
      </router-link>
    </div>
  </div>
</template>

<script>
import { useBreweryStore } from '../store/breweryStore';
export default {
    name: 'BreweryList',
    computed: {
        breweries() {
            const store = useBreweryStore();
            return store.breweries;
        }
    }
}
</script>

<style scoped>
.brewery-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.brewery-card {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
}
</style>