import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useCountryStore } from "../store";
import { useNavigate } from "react-router-dom";


export default function CountryList() {
  const sortedCountries = useCountryStore((state) => state.filteredCountries)
  const navigate = useNavigate();
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 20;
    const totalPages = Math.ceil(sortedCountries.length / itemsPerPage);

    const currentCountries = sortedCountries.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="titles grid grid-cols-3 gap-2 border-b-2 border-[#6C727F] pb-4 lg:grid-cols-4 xl:grid-cols-5">
          <p className="text-white text-sm">Flag</p>
          <p className="text-white text-sm">Name</p>
          <p className="text-white text-sm">Population</p>
          <p className="hidden lg:block text-white text-sm">Area (km²)</p>
          <p className="hidden xl:block text-white text-sm">Region</p>
        </div>
        {currentCountries.map((country) => (
          <div
            key={country.cca3}
            className="country-item grid grid-cols-3 gap-3 mt-2 lg:grid-cols-4 xl:grid-cols-5"
            onClick={() => {
              navigate(`/country/${country.cca3}`);
            }}
          >
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="max-w-[90px] md:max-w-[70px] rounded-md"
            />
            <p className="text-white text-sm">{country.name.common}</p>
            <p className="text-white text-sm">{country?.population?.toLocaleString()}</p>
            <p className="hidden lg:block text-white text-sm">{country?.area?.toLocaleString()}</p>
            <p className="hidden xl:block text-white text-sm">
              {country.region}
            </p>
          </div>
        ))}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>

          <span className="text-white text-sm">
            {" "}
            Página {currentPage} de {totalPages}{" "}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
