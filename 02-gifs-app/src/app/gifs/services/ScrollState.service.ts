import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {

  trendingScrollState = signal<number>(0);

  setScrollState(scrollState: number) {
    this.trendingScrollState.set(scrollState);
  }

}
