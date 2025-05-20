import { Component, ElementRef, input, viewChild } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gif-random-list',
  imports: [],
  templateUrl: './random-list.component.html',
})
export class RandomListComponent { 
  gifsGroup = input.required<Gif[][]>();

  scrollDivRef = viewChild<ElementRef>('groupDiv');
}
