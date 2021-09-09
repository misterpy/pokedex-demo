import { Injectable } from '@angular/core';
import { PokemonInterface } from '../../shared/models/pokemon.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  queryCache: Map<string, PokemonInterface> = new Map<string, PokemonInterface>();
  paginationCache: Map<string, PokemonInterface[]> = new Map<string, PokemonInterface[]>();
  searchCache: Map<string, PokemonInterface[]> = new Map<string, PokemonInterface[]>();

  constructor(
    private readonly http: HttpClient,
  ) {
  }
}
