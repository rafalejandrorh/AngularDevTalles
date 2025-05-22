import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent { 

  countryService = inject(CountryService)
  query = signal<string>('');

  // rxResource is Experimental
  countryResources = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if(!request.query) return of([]);
      return this.countryService.searchByCapital(this.query());
    }
  });

  // resource is Experimental
  // countryResources = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({ request }) => {
  //     if(!request.query) return [];
  //     return await firstValueFrom(this.countryService.searchByCapital(this.query()));
  //   }
  // });

  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(value: string) {

  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(value)
  //   .subscribe({
  //     next: (response) => {
  //       this.isLoading.set(false);
  //       this.countries.set(response);
  //     },
  //     error: (error) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(error.message);
  //     }
  //   });

  // }

}
