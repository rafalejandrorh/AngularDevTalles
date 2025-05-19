import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphy.url.v1}/gifs/trending/`, {
      params: {
        api_key: environment.giphy.apiKey,
        limit: 20,
      }
    }).subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log(gifs);
    })
  }

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphy.url.v1}/gifs/search/`, {
      params: {
        api_key: environment.giphy.apiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map(({data}) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items))
    );
  }

}
