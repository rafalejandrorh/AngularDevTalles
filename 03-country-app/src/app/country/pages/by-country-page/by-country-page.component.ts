import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent { 

  countryService = inject(CountryService);
  query = signal<string>('');

  countryResources = resource({
    request: () => ({ query: this.query() }),
    loader: async({ request }) => {
      if(!request.query) return [];
      return await firstValueFrom(this.countryService.searchByCountry(this.query()));
    }
  });
  
}
