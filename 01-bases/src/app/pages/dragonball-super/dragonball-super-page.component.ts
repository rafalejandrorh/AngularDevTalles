import { Component, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list.component';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dragonball',
  templateUrl: './dragonball-super-page.component.html',
  styleUrl: './dragonball-super-page.component.css',
  imports: [
    CharacterListComponent
  ],
})
export class DragonballSuperPageComponent {

  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 15000 },
    { id: 2, name: 'Vegeta', power: 13000 }
  ]);


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
