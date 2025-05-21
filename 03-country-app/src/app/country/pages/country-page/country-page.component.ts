import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent { 

  code = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['code'])
    )
  );

}

