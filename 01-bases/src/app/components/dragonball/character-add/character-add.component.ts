import { Component, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {
  name = signal('');
  power = signal(0);

  addCharacter() {
    //console.log(this.name(), this.power());
    if(!this.name() || !this.power() || this.power() <= 0) return;

    const newCharacter: Character = {
      id: 1000, //this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }
    console.log(newCharacter);
    //this.characters.update(characters => [...characters, newCharacter]);
    
    this.resetFields();
  }
  
  resetFields() {
    this.name.set('');
    this.power.set(0);
  }

}
