import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball',
  templateUrl: './dragonball-page.component.html',
  styleUrl: './dragonball-page.component.css',
  imports: [
    NgClass
  ],
})
export class DragonballPageComponent {

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 15000 },
    { id: 2, name: 'Vegeta', power: 13000 },
    { id: 3, name: 'Gohan', power: 9000 }
  ]);

  powerClasses = computed(() => {
    return {
      'text-danger': true
    }
  });

}
