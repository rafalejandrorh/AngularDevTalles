import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient)

  private restCountriesUrl = environment.restCountries.url;

  searchByCapital(capital: string) {
    const url = `${this.restCountriesUrl}/capital/${capital.toLowerCase()}`
    return this.http.get(url)
  }

  searchByCountry(country: string) {
    const url = `${this.restCountriesUrl}/name/${country.toLowerCase()}`
    return this.http.get(url)
  }

  searchByAlphaCode(code: string) {
    const url = `${this.restCountriesUrl}/alpha/${code}`
    return this.http.get(url)
  }

  searchByRegion(region: string) {
    const url = `${this.restCountriesUrl}/region/${region.toLowerCase()}`
    return this.http.get(url)
  }

}
