import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { fetchCountryDetails, getAllCountries, getCountryByRegion } from "./services/CountryService";
import type { CountriesList, Country } from "./types";

type CountryStore = {
  countries: CountriesList;
  filteredCountries: CountriesList;
  country: Country | null;
  fetchData: () => Promise<void>;
  fetchByRegion: (region: string) => Promise<void>;

  searchTerm: string;
  selectedRegion: string;
  selectedStatus:string;
  sortBy: string;
  code: string;

  setSearchTerm: (term: string) => void;
  setSelectedRegion: (region: string) => void;
  setSelectedStatus: (status: string) => void;
  setSortBy: (sortBy: string) => void;
  setCountry: (country: Country | null) => void;
  applyFilters: () => void;
  fetchCountryDetails: (code: string) => Promise<void>;
  
};

export const useCountryStore = create<CountryStore>() (devtools((set, get) => ({
    countries: [],
    filteredCountries: [],
    searchTerm: '',
    selectedRegion: '',
    selectedStatus: '',
    sortBy: 'population-desc',
    code: '',
    country: null,
    
    fetchData: async() => {
       const countries = await getAllCountries();
       set(() => ({
         countries
       }));
       get().applyFilters();
      
    },
    fetchByRegion: async(region: string) => {
       const result = await getCountryByRegion(region)
       set(() => ({
         countries: result ,
       }));
       get().applyFilters();
    },
    setSearchTerm: (term: string) => {
      set({searchTerm: term});
      get().applyFilters();
    },
    setSelectedRegion: (region: string) => {
      set({ selectedRegion: region});
      get().applyFilters();
    },
    setSelectedStatus: (status: string) => {
      set({ selectedStatus: status});
      get().applyFilters();
    },
    setSortBy: (sortBy: string) => {
      set({ sortBy });
      get().applyFilters();
    },
    applyFilters: () => {
      const { countries, searchTerm, selectedStatus, sortBy } = get();
        let sorted = [...countries];
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          sorted = sorted.filter(
            (c) =>
              c.name.common.toLowerCase().includes(term) ||
              c.region.toLowerCase().includes(term) ||
              (c.subregion && c.subregion.toLowerCase().includes(term))
          );
        }

        if (selectedStatus === "independent") {
          sorted = sorted.filter((c) => c.independent === true);
        } else if (selectedStatus === "unMember") {
          sorted = sorted.filter((c) => c.unMember === true);
        }

        switch (sortBy) {
          case "name-asc":
            sorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
            break;
          case "name-desc":
            sorted.sort((a, b) => b.name.common.localeCompare(a.name.common));
            break;
          case "population-desc":
            sorted.sort((a, b) => b.population - a.population);
            break;
          case "area-desc":
            sorted.sort((a, b) => b.area - a.area);
            break;
        }  

        set({ filteredCountries: sorted })
    },
    setCountry: (country: Country | null) => {
      set({country});
    },
    fetchCountryDetails: async (code: string) => {
      const countryData = await fetchCountryDetails(code);
      set({ country: countryData });
    }
    
})))