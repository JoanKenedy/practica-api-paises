import { z } from "zod";
import type { CountryResponseSchema, CountryListSchema } from "../schema/country.schema";

export type CountriesList = z.infer<typeof CountryListSchema>;
export type Country = z.infer<typeof CountryResponseSchema>