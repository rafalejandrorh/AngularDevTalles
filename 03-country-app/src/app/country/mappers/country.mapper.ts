import { Country } from "../interfaces/country.interface";
import { RestCountryResponse } from "../interfaces/rest-countries.interface";

export class CountryMapper {
    
    static mapRestCountryToCountry(restCountry: RestCountryResponse): Country {
      return {
        cca2: restCountry.cca2,
        flag: restCountry.flag,
        flagSvg: restCountry.flags.svg,
        name: restCountry.name.common,
        capital: restCountry.capital.join(','),
        population: restCountry.population,
      }
    }

    static mapRestCountriesToCountriesArray(restCountries: RestCountryResponse[]): Country[] {
      return restCountries.map(this.mapRestCountryToCountry);
    }
}