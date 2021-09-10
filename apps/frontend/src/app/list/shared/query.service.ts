import { Injectable } from '@angular/core';
import { PokemonInterface } from '../../shared/models/pokemon.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PokemonListInterface } from '../../shared/models/pokemon-list.interface';
import { map, tap } from 'rxjs/operators';
import { PokemonListSerializer } from './pokemon-list.serializer';
import { PokemonSerializer } from './pokemon.serializer';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private totalCount = 0;
  queryCache: Map<string, PokemonInterface> = new Map<string, PokemonInterface>();
  paginationCache: Map<string, PokemonListInterface[]> = new Map<string, PokemonListInterface[]>();
  searchCache: Map<string, PokemonInterface[]> = new Map<string, PokemonInterface[]>();
  limit = 15;

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  list(page: number): Observable<PokemonListInterface[]> {
    const url = this.getPaginationUrl(this.getOffsetFromPageNumber(page));

    if (this.paginationCache.get(url)) {
      const list: PokemonListInterface[] = this.paginationCache.get(url) || [];
      return of(list);
    }

    return this.http.get<PokemonListInterface[]>(url)
      .pipe(
        map((response: any) => {
          this.totalCount = response.count;

          return response.results;
        }),
        map(results => results.map(PokemonListSerializer.serialize)),
        tap(list => this.paginationCache.set(url, list)),
      );
  }

  details(id: string): Observable<PokemonInterface> {
    const url = this.getDetailUrl(id);

    if (this.queryCache.get(url)) {
      const pokemon: PokemonInterface = this.queryCache.get(url) as PokemonInterface;
      return of(pokemon);
    }

    return this.http.get<PokemonInterface>(url)
      .pipe(
        map(results => PokemonSerializer.serialize(results)),
        tap(pokemon => this.queryCache.set(url, pokemon)),
      );
  }

  getTotalCount(): number {
    return this.totalCount || 0;
  }

  getPaginationUrl(offset: number): string {
    return `${this.baseUrl}/?limit=${this.limit}&offset=${offset}`;
  }

  getDetailUrl(id: string): string {
    return `${this.baseUrl}/${id}/`;
  }

  getOffsetFromPageNumber(page: number): number {
    return ((page || 1) - 1) * this.limit;
  }
}
