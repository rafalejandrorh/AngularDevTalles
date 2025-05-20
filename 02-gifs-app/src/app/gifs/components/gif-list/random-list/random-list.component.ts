import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gif.interface';
import { GifService } from 'src/app/gifs/services/gif.service';

@Component({
  selector: 'gif-random-list',
  imports: [],
  templateUrl: './random-list.component.html',
})
export class RandomListComponent { 

  gifService = inject(GifService);
  gifsGroup = input.required<Gif[][]>();
  scrollDivRef = viewChild<ElementRef>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const scrollHeight = scrollDiv.scrollHeight;
    const clientHeight = scrollDiv.clientHeight;
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    if (isAtBottom) {
      this.loadMoreGifs();
    }
  }

  loadMoreGifs() {
    this.gifService.loadTrendingGifs();
  }

}
