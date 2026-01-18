import { defineStore } from "pinia";
import axios from "axios";

export const useBreweryStore = defineStore("breweryStore", {
  state: () => ({
    breweries: [],
    selectedBrewery: null,
    currentPage: 1,
    perPage: 10,
    searchQuery: "",
    hasNextPage: true,
  }),
  actions: {
    async fetchBreweries(page = 1) {
      let url = "";

      if (this.searchQuery) {
        //SEARCH API
        url = `/api/breweries?query=${encodeURIComponent(this.searchQuery)}&page=${page}&per_page=${this.perPage}`;
      } else {
        // LIST API
        url = `/api/breweries?page=${page}&per_page=${this.perPage}`;
      }

      const response = await axios.get(url);

      this.breweries = response.data;
      this.currentPage = page;
      this.hasNextPage = response.data.length === this.perPage;
    },

    resetBreweries() {
      this.breweries = [];
      this.currentPage = 1;
      this.hasNextPage = true;
    },

    async fetchBreweryDetails(id) {
      const response = await axios.get(`/api/breweries/${id}`);
      this.selectedBrewery = response.data;
      return this.selectedBrewery;
    },
  },
});
