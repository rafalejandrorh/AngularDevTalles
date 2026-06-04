import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent { 

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  countryService = inject(CountryService);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = signal<string>(this.queryParam);

  // resource is Experimental
  countryResources = resource({
    request: () => ({ query: this.query() }),
    loader: async({ request }) => {
      if(!request.query) return [];
      this.router.navigate(['/country/by-country'], {
        queryParams: { query: request.query },
      });
      return await firstValueFrom(this.countryService.searchByCountry(this.query()));
    }
  });
  
}
