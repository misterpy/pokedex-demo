import { Component, Input } from '@angular/core';
import { PokemonInterface } from '../../shared/models/pokemon.interface';

@Component({
  selector: 'pokedex-pokemon-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  private readonly imagePlaceholder = 'https://orig00.deviantart.net/0945/f/2011/237/0/8/who__s_that_pokemon__by_amitlu89-d47rmjf.png';
  currentImage = this.imagePlaceholder;
  private pokemon: PokemonInterface = {} as PokemonInterface;

  @Input() set data(val: PokemonInterface) {
    if (!val) {
      return;
    }

    this.pokemon = val;
    this.processCurrentImage();
  }

  processCurrentImage(): void {
    if (!this.pokemon.sprites) {
      return;
    }

    this.currentImage = this.pokemon.sprites[0] || this.imagePlaceholder;
  }

  onNextImage(): void {
    const imageIndex = this.getNextImageIndex(this.currentImage, this.pokemon.sprites);
    this.currentImage = this.pokemon.sprites[imageIndex] || this.imagePlaceholder;
  }

  onPrevImage(): void {
    const imageIndex = this.getPrevImageIndex(this.currentImage, this.pokemon.sprites);
    this.currentImage = this.pokemon.sprites[imageIndex] || this.imagePlaceholder;
  }

  getNextImageIndex(currentImage: string, images: string[]): number {
    const currentIndex = images.findIndex(val => val === currentImage);
    const nextIndex = currentIndex + 1;
    const lastIndex = images.length - 1;
    if (nextIndex > lastIndex) {
      return 0;
    }

    return nextIndex;
  }

  getPrevImageIndex(currentImage: string, images: string[]): number {
    const currentIndex = images.findIndex(val => val === currentImage);
    const prevIndex = currentIndex - 1;
    const lastIndex = images.length - 1;
    if (prevIndex < 0) {
      return lastIndex;
    }

    return prevIndex;
  }

}
