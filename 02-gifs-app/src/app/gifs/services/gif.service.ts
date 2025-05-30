import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map, Observable, tap } from 'rxjs';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

const GIF_KEY = 'gifs';
const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  return JSON.parse(gifsFromLocalStorage);
};

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);
  private trendingPage = signal(0);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  trendingGifGroup = computed<Gif[][]>(() => {
    const gifs = this.trendingGifs();
    const gifsGroup: Gif[][] = [];
    for (let i = 0; i < gifs.length; i += 3) {
      gifsGroup.push(gifs.slice(i, i + 3));
    }
    return gifsGroup;
  });
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {

    if(this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphy.url.v1}/gifs/trending/`, {
      params: {
        api_key: environment.giphy.apiKey,
        limit: 20,
        offset: this.trendingPage() * 20
      }
    }).subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      // console.log(gifs);
      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
      this.trendingPage.update(currentPage => currentPage + 1);
      this.trendingGifsLoading.set(false);
    })
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphy.url.v1}/gifs/search/`, {
      params: {
        api_key: environment.giphy.apiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map(({data}) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      // Secondary Effect: Use when all executed
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLocaleLowerCase()]: items,
        }))
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
