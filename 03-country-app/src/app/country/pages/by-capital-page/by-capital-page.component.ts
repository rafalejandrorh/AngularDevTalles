import { Component, inject } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent { 

  countryService = inject(CountryService)

  onSearch(value: string) {
    console.log(value);
    this.countryService.searchByCapital(value)
    .subscribe((response) => {
      console.log(response);
    })
  }

}
