import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { QueryService } from '../../list/shared/query.service';
import { PokemonInterface } from '../../shared/models/pokemon.interface';
import { WishlistService } from '../../shared/services/wishlist.service';
import { CaughtlistService } from '../../shared/services/caughtlist.service';

@Component({
  selector: 'pokedex-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnDestroy {
  private readonly destroyed$: Subject<boolean> = new Subject<boolean>();

  pokemon: PokemonInterface = {} as PokemonInterface;

  constructor(
    readonly wishlist: WishlistService,
    readonly caughtlist: CaughtlistService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly query: QueryService,
  ) {
    route.paramMap
      .pipe(
        tap(paramMap => {
          if (paramMap.get('id') === null) {
            return this.onBack();
          }
        }),
        filter(paramMap => paramMap.get('id') !== null),
        map(paramMap => paramMap.get('id') as string),
        switchMap(id => this.query.details(id)),
        takeUntil(this.destroyed$),
      )
      .subscribe(pokemon => {
        this.pokemon = pokemon;
        console.log('pokemon >>>', this.pokemon);
      });
  }

  onWish(id: string): void {
    this.query.details(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(pokemon => {
        this.wishlist.isAdded(id) ? this.wishlist.remove(pokemon) : this.wishlist.add(pokemon);
      });
  }

  onCaught(id: string): void {
    this.query.details(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(pokemon => {
        this.caughtlist.isAdded(id) ? this.caughtlist.remove(pokemon) : this.caughtlist.add(pokemon);
      });
  }

  onBack(): void {
    this.router.navigate(['list']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
