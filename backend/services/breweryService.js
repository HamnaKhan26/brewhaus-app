const axios = require("axios");

const API_URL = "https://api.openbrewerydb.org/v1/breweries";

const getAllBreweries = async (page = 1, per_page = 10, search = "") => {
  let url;

  if (search) {
    // SEARCH API
    url = `${API_URL}/search?query=${encodeURIComponent(search)}&page=${page}&per_page=${per_page}`;
  } else {
    // LIST API
    url = `${API_URL}?page=${page}&per_page=${per_page}`;
  }

  const response = await axios.get(url);
  return response.data;
};

const getBreweryById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

module.exports = {
  getAllBreweries,
  getBreweryById,
};
