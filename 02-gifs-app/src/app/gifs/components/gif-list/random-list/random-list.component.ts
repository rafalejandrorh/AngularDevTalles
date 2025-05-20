import { AfterViewInit, Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gif.interface';
import { GifService } from 'src/app/gifs/services/gif.service';
import { ScrollStateService } from 'src/app/gifs/services/ScrollState.service';

@Component({
  selector: 'gif-random-list',
  templateUrl: './random-list.component.html',
})
export class RandomListComponent implements AfterViewInit{ 

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);
  gifsGroup = input.required<Gif[][]>();
  scrollDivRef = viewChild<ElementRef>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
    scrollDiv.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const scrollHeight = scrollDiv.scrollHeight;
    const clientHeight = scrollDiv.clientHeight;
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.loadMoreGifs();
    }
  }

  loadMoreGifs() {
    this.gifService.loadTrendingGifs();
  }

}
