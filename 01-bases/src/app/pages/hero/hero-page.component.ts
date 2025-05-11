import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css',
})
export class HeroPageComponent {

  nameSignal = signal('Ironman');
  ageSignal = signal(45);

  heroDescription = computed(() => {
    const description = `${ this.name() } - ${ this.ageSignal() }`;
    return description;
  });

  capitalizedName = computed(() => {
    return this.name().toUpperCase();
  });

  name():string {
    return this.nameSignal();
  }

  age():number {
    return this.ageSignal();
  }

  changeHero():void {
    this.nameSignal.set('Spiderman');
    this.ageSignal.set(22);
  }

  changeAge():void {
    this.ageSignal.set(60);
  }

  resetForm():void {
    this.nameSignal.set('Ironman')
    this.ageSignal.set(45)
  }

}