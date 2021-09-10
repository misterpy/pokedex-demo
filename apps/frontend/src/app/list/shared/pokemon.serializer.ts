import { PokemonInterface } from '../../shared/models/pokemon.interface';
import { StatInterface } from './stat.interface';

export class PokemonSerializer {
  static serialize(data: any): PokemonInterface {
    return {
      name: data.name,
      id: String(data.id),
      abilities: (data.abilities || []).map(PokemonSerializer.serializeAbility).join(', '),
      moves: (data.moves || []).map(PokemonSerializer.serializeMove).join(', '),
      base_experience: data.base_experience,
      height: data.height,
      weight: data.weight,
      sprites: PokemonSerializer.serializeSprites(data.sprites || {}),
      species: PokemonSerializer.serializeSpecies(data.species),
      stats: (data.stats || []).map(PokemonSerializer.serializeStat),
      types: (data.types || []).map(PokemonSerializer.serializeType).join(', '),
    };
  }

  static serializeAbility(data: any): string {
    return data.ability.name;
  }

  static serializeMove(data: any): string {
    return data.move.name;
  }

  static serializeSpecies(data: any): string {
    return data?.name;
  }

  static serializeSprites(data: any): string[] {
    return Object.values(data).filter(val => !!val && typeof val !== 'object') as string[];
  }

  static serializeType(data: any): string[] {
    return data.type.name;
  }

  static serializeStat(data: any): StatInterface {
    return {
      name: data.stat.name,
      base_stat: data.base_stat,
    };
  }
}
