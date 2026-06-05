import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { SearchRegionButtonComponent } from "../../components/search-region-button/search-region-button.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Region, REGIONS } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent, SearchRegionButtonComponent],
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent { 

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  countryService = inject(CountryService)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  selectedRegion = linkedSignal<Region | null>(() => validateQueryParam(this.queryParam));

  // resource is Experimental
  countryResources = resource({
    request: () => ({ region: this.selectedRegion() }),
    loader: async({ request }) => {
      if(!request.region) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: { region: request.region },
      });
      return await firstValueFrom(this.countryService.searchByRegion(request.region));
    }
  });
  
}

function validateQueryParam(queryParam: string): Region {
  if (REGIONS.includes(queryParam as Region)) {
    return REGIONS.filter(region => region === queryParam)[0] as Region;
  }
  return 'Americas';
}