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
    // NgClass
  ],
})
export class DragonballPageComponent {

  name = signal('Gohan');
  power = signal(100);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 15000 },
    { id: 2, name: 'Vegeta', power: 13000 },
    { id: 3, name: 'Gohan', power: 9000 },
    { id: 4, name: 'Piccolo', power: 3000 }
  ]);

  powerClasses = computed(() => {
    return {
      'text-danger': true
    }
  });

  addCharacter() {
    //console.log(this.name(), this.power());
    if(!this.name() || !this.power() || this.power() <= 0) return;

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }
    this.characters.update(characters => [...characters, newCharacter]);
    
    this.resetFields();
  }
  
  resetFields() {
    this.name.set('');
    this.power.set(0);
  }

}
