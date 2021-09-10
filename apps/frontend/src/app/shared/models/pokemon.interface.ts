import { StatInterface } from '../../list/shared/stat.interface';

export interface PokemonInterface {
  name: string;
  abilities: string;
  moves: string;
  base_experience: number;
  height: number;
  id: string;
  sprites: string[];
  species: string;
  weight: number;
  user?: string;
  stats: StatInterface[];
  types: string;
}
