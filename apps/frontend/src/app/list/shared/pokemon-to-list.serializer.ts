import { PokemonListInterface } from '../../shared/models/pokemon-list.interface';

export class PokemonToListSerializer {
  static serialize(data: any): PokemonListInterface {
    return {
      name: data.name,
      id: String(data.id),
    };
  }
}
