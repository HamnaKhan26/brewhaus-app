const axios = require("axios");

const API_URL = "https://api.openbrewerydb.org/v1/breweries";

const getAllBreweries = async (page, per_page, search) => {
  // GET https://api.openbrewerydb.org/v1/breweries?by_name=san_diego&per_page=3

  let url = `${API_URL}?page=${page}&per_page=${per_page}`;

  if (search) {
    url += `&by_name=${encodeURIComponent(search)}`;
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
