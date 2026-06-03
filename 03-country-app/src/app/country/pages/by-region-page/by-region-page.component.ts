import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent { 
  
  countryService = inject(CountryService)
  query = signal<string>('');

  // rxResource is Experimental
  countryResources = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if(!request.query) return of([]);
      return this.countryService.searchByRegion(this.query());
    }
  });
  
}
