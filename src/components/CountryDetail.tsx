import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";


import { useCountryStore } from "../store";
import { fetchBorderCountries } from "../services/CountryService";
import type { Country } from "../types";

export default function CountryDetail() {
  const { code } = useParams<{ code: string }>();
   const navigate = useNavigate();
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
   const country = useCountryStore((state) => state.country);
     const fetchCountryDetails = useCountryStore(
       (state) => state.fetchCountryDetails
     );

    useEffect(() => {
      if (code && (!country || country.cca3 !== code)) {
        fetchCountryDetails(code);
      }
    }, [code, fetchCountryDetails, country]);   

  useEffect(() => {
    if (country && country.borders && country.borders.length > 0) {
      fetchBorderCountries(country.borders).then(setBorderCountries);
    } else {
      setBorderCountries([]);
    }
  }, [country]);
 



  if (!country) {
    return (
      <div className="text-white text-center py-10">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="text-white  bg-[#1F2023] rounded-md py-5 px-3 border mx-auto md:max-w-3xl border-gray-600/20">
      {/* Contenido principal */}
      <div className="grid grid-cols-1  gap-8">
        {/* Bandera */}
        <div className="flex flex-col justify-center -mt-12">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="max-w-[250px] max-h-80  inline-block  m-auto object-contain shadow-lg rounded-xl "
          />
          <h1 className="text-3xl font-bold mb-2 mt-3 text-center md:mt-5">
            {country.name.common}
          </h1>
          <div className="text-center mb-2">{country.name.official}</div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:mx-auto md:mt-4 md:w-[80%]">
            <div className="bg-[#282B30] px-4 py-3 border-none text-[16px] rounded-md text-center">
              Population: <span className="text-black font-[100] ">|</span>{" "}
              {country.population?.toLocaleString()}
            </div>
            <div className="bg-[#282B30] px-4 py-3 border-none text-[16px] rounded-md text-center ">
              Area (km²): <span className="text-black font-[100] ">|</span>{" "}
              {country.area?.toLocaleString()} km²
            </div>
          </div>
        </div>

        {/* Información */}
        <div>
          <table className="w-full text-sm font-normal">
            <tbody className="w-full flex flex-col">
              {country.capital && (
                <tr className="border-t border-b border-gray-600/20 flex justify-between ">
                  <td className="py-4">Capital:</td>
                  <td className="py-4">{country.capital.join(", ")}</td>
                </tr>
              )}

              {country.subregion && (
                <tr className="border-t border-b border-gray-600/20 flex justify-between ">
                  <td className="py-4">Subregion:</td>
                  <td className="py-4">{country.subregion}</td>
                </tr>
              )}

              {country.languages && (
                <tr className="border-t border-b border-gray-600/20 flex justify-between ">
                  <td className="py-4">Languages:</td>
                  <td className="py-4">
                    {Object.values(country.languages).join(", ")}
                  </td>
                </tr>
              )}

              {country.currencies && (
                <tr className="border-t border-b border-gray-600/20 flex justify-between ">
                  <td className="py-4">Currencies:</td>
                  <td className="py-4">
                    {Object.values(country.currencies)
                      .map((curr) => `${curr.name || "Unknown"}`)
                      .join(", ")}
                  </td>
                </tr>
              )}
              {country.continents && (
                <tr className="border-t border-b border-gray-600/20 flex justify-between ">
                  <td className="py-4">Continents:</td>
                  <td className="py-4">
                    {Object.values(country.continents).join(", ")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {country.borders && country.borders.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">
                Neighbouring Countries
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4">
                {borderCountries.map((border) => (
                  <div
                    key={border.cca3}
                    className="py-2 rounded-md text-sm"
                    onClick={() => {
                      navigate(`/country/${border.cca3}`);
                    }}
                  >
                    <img
                      src={border.flags.svg}
                      alt={border.name.common}
                      className="max-w-[120px] max-h-[65px]  m-auto shadow-lg rounded-xl "
                    />
                    <p className="text-white text-[12px] text-center mt-2">
                      {border.name.common}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
