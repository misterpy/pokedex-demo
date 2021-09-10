import { PokemonListInterface } from '../../shared/models/pokemon-list.interface';

export class PokemonListSerializer {
  static serialize(data: any): PokemonListInterface {
    return {
      name: data.name,
      id: PokemonListSerializer.getIdFromUrl(data.url),
    };
  }

  static getIdFromUrl(url: string): string {
    const cleanedUrl = url.substring(0, url.length - 1);
    return cleanedUrl.split('/').pop() as string;
  }
}
