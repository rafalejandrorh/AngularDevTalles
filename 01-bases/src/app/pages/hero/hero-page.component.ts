import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css',
})
export class HeroPageComponent {

    nameSignal = signal('Ironman');
    ageSignal = signal(45);

    // capitalizedName(name: string):string {
    //     return name.toUpperCase();
    // }

    name():string {
        return this.nameSignal();
    }

    age():number {
        return this.ageSignal();
    }

    getHeroDescription():string {
        return `${this.nameSignal()} - ${this.ageSignal()}`;
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