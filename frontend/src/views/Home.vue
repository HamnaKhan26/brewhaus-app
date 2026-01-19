<template>
    <h1>Welcome to BrewHaus!</h1>
    <p>Your one-stop solution for managing your home brewing adventures.</p>

    <div>
        <SearchBar v-model="searchQuery" />
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
import debounce from 'lodash/debounce'
import { onMounted, computed, ref, watch, onBeforeUnmount } from 'vue';

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
            set: (value) => (breweryStore.searchQuery = value)
        });

        const { currentPage, hasNextPage } = storeToRefs(breweryStore);

        const loadBreweries = async (page = 1) => {
            loading.value = true;
            await breweryStore.fetchBreweries(page);
            loading.value = false;
        };

        const debouncedSearch = debounce(() => {
            breweryStore.resetBreweries();
            loadBreweries(1);
        }, 400);

        watch(searchQuery, (newVal) => {
            if (newVal && newVal.trim()) {
                debouncedSearch();
            } else {
                breweryStore.resetBreweries();
                loadBreweries(1);
            }
        });

        onMounted(() => {
            if (!breweryStore.breweries.length) {
                loadBreweries(1);
            }
        });

        const onPageChange = (page) => {
            loadBreweries(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        onBeforeUnmount(() => {
            debouncedSearch.cancel();
        });

        return {
            breweryStore,
            searchQuery,
            loading,
            hasNextPage,
            currentPage,
            onPageChange
        };
    }

};

</script>