import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { RestCountryResponse } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { tap, map, Observable, catchError, throwError, delay, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();
  private restCountriesUrl = environment.restCountries.url;

  searchByCapital(capital: string): Observable<Country[]> {
    const query = capital.toLowerCase();
    if(this.queryCacheCapital.has(query)) {
      console.log('Returning cached result by capital:', capital);
      return of(this.queryCacheCapital.get(query)!);
    }

    console.log('Fetching from API by capital:', capital);
    const url = `${this.restCountriesUrl}/capital/${query}`
    return this.http.get<RestCountryResponse[]>(url).pipe(
      map((response) => CountryMapper.mapRestCountriesToCountriesArray(response)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      // delay(3000), // Simulate a delay of 3 second
      catchError((error) => {
        console.error('Error fetching countries by capital:', error);
        return throwError(() => new Error(`No se encontraron Países con esa búsqueda: ${capital}`));
      })
    );
  }

  searchByCountry(country: string): Observable<Country[]> {
    const query = country.toLowerCase();
    if(this.queryCacheCountry.has(query)) {
      console.log('Returning cached result by country:', country);
      return of(this.queryCacheCountry.get(query)!).pipe(
        delay(3000) // Simulate a delay of 3 second
      );
    }

    console.log('Fetching from API by country:', country);
    const url = `${this.restCountriesUrl}/name/${query}`
    return this.http.get<RestCountryResponse[]>(url).pipe(
      map((response) => CountryMapper.mapRestCountriesToCountriesArray(response)),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      delay(3000), // Simulate a delay of 3 second
      catchError((error) => {
        console.log(error);
        console.error('Error fetching countries by country:', error);
        return throwError(() => new Error(`No se encontraron Países con esa búsqueda: ${country}`));
      })
    );
  }

  searchByAlphaCode(code: string) {
    const query = code;
    console.log('Fetching from API by alpha code:', code);
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

  searchByRegion(region: string): Observable<Country[]> {
    const query = region.toLowerCase();
    if(this.queryCacheRegion.has(query)) {
      console.log('Returning cached result by region:', region);
      return of(this.queryCacheRegion.get(query)!);
    }

    console.log('Fetching from API by region:', region);
    const url = `${this.restCountriesUrl}/region/${query}`
    return this.http.get<RestCountryResponse[]>(url).pipe(
      map((response) => CountryMapper.mapRestCountriesToCountriesArray(response)),
      tap(countries => this.queryCacheRegion.set(query, countries)),
      catchError((error) => {
        console.error('Error fetching countries by region:', error);
        return throwError(() => new Error(`No se encontraron Países con esa búsqueda: ${region}`));
      })
    );
  }

}
