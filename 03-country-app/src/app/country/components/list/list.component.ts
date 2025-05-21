import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './list.component.html',
})
export class ListComponent { 

  countries = input.required<Country[]>();
}
