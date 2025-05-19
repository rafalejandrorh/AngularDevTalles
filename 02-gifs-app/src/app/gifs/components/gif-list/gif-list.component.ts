import { Component, input } from '@angular/core';
import { ListItemComponent } from "./list-item/list-item.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [ListItemComponent],
  templateUrl: './gif-list.component.html',
})
export class GifListComponent { 
  gifs = input.required<Gif[]>();
}
