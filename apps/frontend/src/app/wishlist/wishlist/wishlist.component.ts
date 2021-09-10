import { Component, OnDestroy } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../authentication/shared/auth.service';
import { Subject } from 'rxjs';
import { WishlistService } from '../../shared/services/wishlist.service';

@Component({
  selector: 'pokedex-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnDestroy {
  private readonly destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    readonly wishlist: WishlistService,
    private readonly authService: AuthService,
  ) {
    this.authService.currentUser$
      .pipe(
        filter(user => user !== ''),
        takeUntil(this.destroyed$),
      )
      .subscribe(() => {
        this.wishlist.initList();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
