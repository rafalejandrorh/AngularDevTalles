import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'country-app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'CountryApp';
}
