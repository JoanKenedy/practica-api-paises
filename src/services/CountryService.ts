import axios from 'axios';
import { CountryListSchema, CountryResponseSchema } from '../schema/country.schema';



export async function getAllCountries(){
    const url =
      "https://restcountries.com/v3.1/all?fields=name,region,subregion,flags,population,area,cca3,independent,unMember";
    const {data} = await axios.get(url);
    const result = CountryListSchema.safeParse(data);
    if(result.success){
        return result.data
    } 
    return [];
}

export async function getCountryByRegion(region: string){
    const url = `https://restcountries.com/v3.1/region/${region}?fields=name,region,flags,population,area,cca3,independent,unMember,subregion`;
    const {data} = await axios.get(url);
    console.log(data);
    const result = CountryListSchema.safeParse(data);
    if (result.success) {
      return result.data;
    }
    return [];
}

export async function fetchCountryDetails(code: string) {
  const url = `https://restcountries.com/v3.1/alpha/${code}?fields=name,region,flags,population,area,cca3,independent,unMember,subregion,capital,languages,currencies,continents,borders`;
  const { data } = await axios.get(url);
  console.log(data);
  const result = CountryResponseSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  return null;
}

export async function fetchBorderCountries(codes: string[]) {
  if (codes.length === 0) return [];
  const url = `https://restcountries.com/v3.1/alpha?codes=${codes.join(
    ","
  )}&fields=name,flags,cca3`;
  const { data } = await axios.get(url);
  // Validar con Zod si quieres
  return Array.isArray(data)
    ? data.map((item) => CountryResponseSchema.parse(item))
    : [];
}
