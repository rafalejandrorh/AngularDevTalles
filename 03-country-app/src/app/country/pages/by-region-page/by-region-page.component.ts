import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { Region, REGIONS } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent { 
  
  public readonly regions: readonly Region[] = REGIONS;

  selectedRegion = signal<Region | null>(null);
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

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
    this.query.set(region);
  }
  
}
