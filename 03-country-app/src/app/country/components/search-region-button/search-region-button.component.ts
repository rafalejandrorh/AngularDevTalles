import { Component, output, signal } from '@angular/core';
import { Region, REGIONS } from '../../interfaces/region.type';

@Component({
  selector: 'country-search-region-button',
  imports: [],
  templateUrl: './search-region-button.component.html'
})
export class SearchRegionButtonComponent { 

  public readonly regions: readonly Region[] = REGIONS;
  
  value = output<Region>();
  selectedRegion = signal<Region | null>(null);

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
    this.value.emit(region);
  }

}
