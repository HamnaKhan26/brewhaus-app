import { setActivePinia, createPinia } from "pinia";
import { useBreweryStore } from "../src/store/breweryStore";
import axios from "axios";
import { vi, describe, beforeEach, it, expect, toBe } from "vitest";

vi.mock("axios"); // Mock Axios

describe("Brewery Store", () => {
  let breweryStore;
  beforeEach(() => {
    setActivePinia(createPinia());
    breweryStore = useBreweryStore();
  });

  it("fetch breweries", async () => {
    const store = useBreweryStore();

    // mock axios.get for any URL
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          { id: 1, name: "Brewery 1" },
          { id: 2, name: "Brewery 2" },
        ],
      }),
    );

    await store.fetchBreweries(1);

    expect(store.breweries.length).toBe(2);
    expect(store.currentPage).toBe(1);
  });
});
