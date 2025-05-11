import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush, // Use Zoneless
  standalone: true,
  imports: [],
})
export class CounterPageComponent {
  counter = 0;
  counterSignal = signal(0);

  constructor() {
    setInterval(() => {
      //console.log('Tick');
      //this.counter += 1;
      //this.counterSignal.update((current) => current + 1);
      //this.increaseBy(1);
    }, 2000)
  }

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