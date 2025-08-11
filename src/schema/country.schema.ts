import { z } from "zod";



export const CountryResponseSchema = z.object({
  name: z.object({
    common: z.string(),
    official: z.string(),
  }),
  region: z.string().optional(),
  flags: z.object({
    png: z.string(),
    svg: z.string(),
  }),
  population: z.number().optional(),
  area: z.number().optional(),
  cca3: z.string(),
  unMember: z.boolean().optional(),
  independent: z.boolean().optional(),
  subregion: z.string().optional(),
  capital: z.array(z.string()).optional(),
  languages: z.record(z.string(), z.string()).optional(),
  currencies: z.record(
    z.string(),
    z.object({
      symbol: z.string().optional(),
      name: z.string().optional(),
    })
  ).optional(),
  continents: z.array(z.string()).optional(),
  borders: z.array(z.string()).optional()
});

export const CountryListSchema = z.array(CountryResponseSchema);