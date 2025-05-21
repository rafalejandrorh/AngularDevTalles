import { Country } from "../interfaces/country.interface";
import { RestCountryResponse } from "../interfaces/rest-countries.interface";

export class CountryMapper {
    
    static mapRestCountryToCountry(country: RestCountryResponse): Country {
      return {
        cca2: country.cca2,
        flag: country.flag,
        flagSvg: country.flags.svg,
        name: country.name.common,
        capital: country.capital[0],
        population: country.population,
    }
    }

    static mapRestCountriesToCountriesArray(items: RestCountryResponse[]): Country[] {
      return items.map(this.mapRestCountryToCountry);
    }
}