import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CaughtlistService } from '../../shared/services/caughtlist.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { takeUntil } from 'rxjs/operators';
import { QueryService } from '../../list/shared/query.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PokemonListInterface } from '../../shared/models/pokemon-list.interface';

@Component({
  selector: 'pokedex-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnDestroy {
  private readonly destroyed$: Subject<boolean> = new Subject<boolean>();

  @Input() items: PokemonListInterface[] | null = [];

  constructor(
    readonly caughtlist: CaughtlistService,
    readonly wishlist: WishlistService,
    private readonly query: QueryService,
    private readonly router: Router,
  ) {}

  onViewDetail(id: string) {
    this.router.navigate(['details', id]);
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

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
