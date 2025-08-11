import { MagnifyingGlassIcon, ChevronDownIcon} from "@heroicons/react/24/outline";
import RadioButton from "./RadioButton";
import CountryList from "./CountryList";
import { useCountryStore } from "../store";



export default function CountryRanking() {
  const filteredCountries = useCountryStore((state) => state.filteredCountries);
  const fetchByRegion = useCountryStore((state) => state.fetchByRegion);
  const searchTerm = useCountryStore((state) => state.searchTerm);
  const setSearchTerm = useCountryStore((state) => state.setSearchTerm);
  const sortBy = useCountryStore((state) => state.sortBy);
  const setSortBy = useCountryStore((state) => state.setSortBy);  
  const selectedStatus = useCountryStore((state) => state.selectedStatus);
  const setSelectedStatus = useCountryStore((state) => state.setSelectedStatus);
  const selectedRegion = useCountryStore((state) => state.selectedRegion);
  const setSelectedRegion = useCountryStore((state) => state.setSelectedRegion);

  // Define the regions
  const  regiones = ["Africa", "America", "Asia", "Europe", "Oceania", "Antarctic"];
  


   const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
     setSortBy(e.target.value);
   };

   const handleRegion = (e: React.MouseEvent<HTMLButtonElement>) => {
     const region = e.currentTarget.dataset.region;
     if(region){
        setSelectedRegion(region);
        fetchByRegion(region);  
        setSelectedStatus(""); // Reset status when changing region
     }
   };

  const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(e.target.value);

  };
  

  return (
    <div className="container-ranking w-[95%] m-auto max-h-full rounded-md py-5 px-3 border border-gray-600/20">
      <div className="flex flex-col gap-4  lg:grid lg:grid-cols-4 lg:gap-8 lg:py-0">
        <div className="lg:col-span-4">
          <form action="" className="lg:flex lg:justify-between">
            <h2 className="text-white text-md">
              Found {filteredCountries ? filteredCountries.length : 0} countries
            </h2>
            <div className="input-container mt-3 lg:w-[30%] p-3 rounded-xl relative lg:mt-0">
              <MagnifyingGlassIcon className="w-6 h-6 text-white absolute" />
              <input
                type="text"
                placeholder="Search Name, Región, Subregión..."
                className="search ml-8 w-[90%] text-white text-md pl-2 "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="lg:col-span-1 lg:mr-4">
          <form action="" className="flex flex-col gap-4 lg:mt-0 lg:gap-6">
            <div className="flex flex-col gap-2 w-full relative">
              <label htmlFor="sort" className="text-white text-sm">
                Sort by
              </label>
              <ChevronDownIcon className="w-4 h-4 text-white stroke-3 absolute right-3 top-12 md:top-11" />
              <select
                name="sort"
                id="sort"
                onChange={handleSort}
                value={sortBy}
                className="p-3 appearance-none bg-transparent border-2 outline-0 rounded-xl border-[#6C727F] text-white text-sm md:text-[12px]"
              >
                <option value="name-asc" className="text-black text-sm">
                  Name (A-Z)
                </option>
                <option value="name-desc" className="text-black">
                  Name (Z-A)
                </option>
                <option value="population-desc" className="text-black text-sm">
                  Population (mayor a menor)
                </option>
                <option value="area-desc" className="text-black text-sm">
                  Area (mayor a menor)
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full relative">
              <label htmlFor="region" className="text-white text-sm">
                Región
              </label>
              <div className="region-select grid grid-cols-3 gap-2">
                {regiones.map((reg) => (
                  <button
                    key={reg}
                    type="button"
                    onClick={handleRegion}
                    data-region={reg}
                    className={`px-4 py-2 rounded border-none text-sm ${
                      selectedRegion === reg
                        ? "bg-[#282B30] text-white rounded-xl "
                        : "bg-transparent text-white"
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>
            <div className="">
              <span className="text-white text-sm">Status</span>
              <div className="container-radio flex flex-col gap-2 my-2">
                <RadioButton
                  label="Member of the United Nations"
                  value="unMember"
                  checked={selectedStatus === "unMember"}
                  onChange={handleStatus}
                />
                <RadioButton
                  label="Independent"
                  value="independent"
                  checked={selectedStatus === "independent"}
                  onChange={handleStatus}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-3">
          <CountryList />
        </div>
      </div>
    </div>
  );
}

