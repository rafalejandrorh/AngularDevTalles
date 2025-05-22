import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { RestCountryResponse } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient)

  private restCountriesUrl = environment.restCountries.url;

  searchByCapital(capital: string): Observable<Country[]> {
    const url = `${this.restCountriesUrl}/capital/${capital.toLowerCase()}`
    return this.http.get<RestCountryResponse[]>(url).pipe(
      map((response) => CountryMapper.mapRestCountriesToCountriesArray(response)),
      // delay(3000), // Simulate a delay of 3 second
      catchError((error) => {
        console.error('Error fetching countries by capital:', error);
        return throwError(() => new Error(`No se encontraron Países con esa búsqueda: ${capital}`));
      })
    );
  }

  searchByCountry(country: string) {
    const url = `${this.restCountriesUrl}/name/${country.toLowerCase()}`
    return this.http.get<RestCountryResponse[]>(url).pipe(
      map((response) => CountryMapper.mapRestCountriesToCountriesArray(response)),
      //delay(3000), // Simulate a delay of 3 second
      catchError((error) => {
        console.error('Error fetching countries by name:', error);
        return throwError(() => new Error(`No se encontraron Países con esa búsqueda: ${country}`));
      })
    );
  }

  searchByAlphaCode(code: string) {
    const url = `${this.restCountriesUrl}/alpha/${code}`
    return this.http.get<RestCountryResponse[]>(url).pipe(
      map((response) => CountryMapper.mapRestCountriesToCountriesArray(response)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.error('Error fetching countries by alpha code:', error);
        return throwError(() => new Error(`No se encontraron Países con esa búsqueda: ${code}`));
      })
    );
  }

  searchByRegion(region: string) {
    const url = `${this.restCountriesUrl}/region/${region.toLowerCase()}`
    return this.http.get(url)
  }

}
