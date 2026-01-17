<template>
    <h1>Welcome to BrewHaus!</h1>
    <p>Your one-stop solution for managing your home brewing adventures.</p>

    <div>
        <SearchBar v-model="searchQuery" @search="onSearch" />
        <Loader v-if="loading" />
        <BreweryList v-else />
        <p>Total Breweries: {{ breweryStore.breweries.length }}</p>
        <Pagination :current-page="currentPage" :has-next-page="hasNextPage" @page-changed="onPageChange" />
    </div>
</template>

<script>
import BreweryList from '../components/BreweryList.vue';
import { useBreweryStore } from '../store/breweryStore';
import SearchBar from '../components/SearchBar.vue';
import Pagination from '../components/Pagination.vue';
import Loader from '../components/Loader.vue';
import { onMounted, computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

export default {
    name: 'Home',
    components: {
        BreweryList,
        SearchBar,
        Pagination,
        Loader
    },
    setup() {
        const breweryStore = useBreweryStore();
        const loading = ref(false);

        const searchQuery = computed({
            get: () => breweryStore.searchQuery,
            set: (value) => breweryStore.searchQuery = value
        });

        const { fetchBreweries, currentPage, hasNextPage } = storeToRefs(breweryStore);

        // Wrap fetchBreweries to toggle loader
        const loadBreweries = async (page = 1) => {
            loading.value = true;
            await breweryStore.fetchBreweries(page);
            loading.value = false;
        };

        onMounted(() => {
            if (!breweryStore.breweries.length) {
                loadBreweries(1);
            }
        });

        const onSearch = () => loadBreweries(1); // reset page
        const onPageChange = (page) => loadBreweries(page);
        return {
            breweryStore,
            fetchBreweries,
            searchQuery,
            currentPage,
            hasNextPage,
            onSearch,
            onPageChange,
            loading
        };
    },
};

</script>