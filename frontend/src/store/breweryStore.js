import { defineStore } from "pinia";
import axios from "axios";

export const useBreweryStore = defineStore("breweryStore", {
  state: () => ({
    breweries: [],
    selectedBrewery: null,
    currentPage: 1,
    searchQuery: "",
    hasNextPage: true,
  }),
  actions: {
    async fetchBreweries(page) {
      const query = this.searchQuery
        ? `&by_name=${encodeURIComponent(this.searchQuery)}`
        : "";
      const response = await axios.get(
        `/api/breweries?page=${page}&per_page=10${query}`
      );
      this.breweries = response.data;
      this.currentPage = page;

      this.hasNextPage = response.data.length > 0;

    },

    async fetchBreweryDetails(id) {
      const response = await axios.get(`/api/breweries/${id}`);
      this.selectedBrewery = response.data;
      return this.selectedBrewery;
    },
  },
});
