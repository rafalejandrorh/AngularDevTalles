import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-custom-page',
  imports: [],
  templateUrl: './custom-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomPage {}
