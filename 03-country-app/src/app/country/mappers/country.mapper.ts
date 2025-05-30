import { Country } from "../interfaces/country.interface";
import { RestCountryResponse } from "../interfaces/rest-countries.interface";

export class CountryMapper {
    
    static mapRestCountryToCountry(restCountry: RestCountryResponse): Country {
      return {
        cca2: restCountry.cca2,
        flag: restCountry.flag,
        flagSvg: restCountry.flags.svg,
        name: restCountry.translations['spa'].common ?? 'No Spanish Name Country',
        capital: restCountry.capital.join(','),
        population: restCountry.population,
        region: restCountry.region,
        subregion: restCountry.subregion,
        officialName: restCountry.translations['spa'].official,
      }
    }

    static mapRestCountriesToCountriesArray(restCountries: RestCountryResponse[]): Country[] {
      return restCountries.map(this.mapRestCountryToCountry);
    }
}