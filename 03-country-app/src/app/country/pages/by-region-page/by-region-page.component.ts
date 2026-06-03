import { Component, inject, resource, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { SearchRegionButtonComponent } from "../../components/search-region-button/search-region-button.component";

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent, SearchRegionButtonComponent],
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent { 

  countryService = inject(CountryService)
  query = signal<string>('');

  // resource is Experimental
  countryResources = resource({
    request: () => ({ query: this.query() }),
    loader: async({ request }) => {
      if(!request.query) return [];
      return await firstValueFrom(this.countryService.searchByRegion(this.query()));
    }
  });
  
}
