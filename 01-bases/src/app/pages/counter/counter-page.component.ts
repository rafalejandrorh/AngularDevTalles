import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
  standalone: true,
  imports: [],
})
export class CounterPageComponent {
  counter = 0;
  counterSignal = signal(0);

  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update((current) => current + value);
  }

  decreaseBy(value: number) {
    this.counter -= value;
    this.counterSignal.update((current) => current - value);
  }

  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0);
  }
}