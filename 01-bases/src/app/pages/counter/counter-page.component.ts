import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
  standalone: true,
  imports: [],
})
export class CounterPageComponent {
  counter = 0;

  increaseBy(value: number) {
    this.counter += value;
  }

  decreaseBy(value: number) {
    this.counter -= value;
  }

  resetCounter() {
    this.counter = 0;
  }
}