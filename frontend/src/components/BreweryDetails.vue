<template>
    <div v-if="brewery">
        <h1>{{ brewery.name }}</h1>
        <p>{{ brewery.street }}, {{ brewery.city }}, {{ brewery.state }}</p>
        <p>Type: {{ brewery.brewery_type }}</p>
        <a :href="brewery.website_url" target="_blank">Visit Website</a>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useBreweryStore } from '../store/breweryStore';
import { useRoute } from 'vue-router';

export default {
    props: {
        id: {
            type: String, // route params are always strings
            required: true
        }
    },
    setup(props) {
        const store = useBreweryStore();
        //const route = useRoute();
        const brewery = ref(null);

        onMounted(async () => {
            brewery.value = await store.fetchBreweryDetails(props.id);
        });

        return { brewery };
    }
};
</script>
