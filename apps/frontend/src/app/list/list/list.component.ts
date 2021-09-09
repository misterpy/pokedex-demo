import { Component, OnDestroy } from '@angular/core';
import { CaughtlistService } from '../../shared/services/caughtlist.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import { AuthService } from '../../authentication/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pokedex-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
  private readonly destroyed$: Subject<boolean> = new Subject<boolean>();

  private wishlistMap: Record<string, boolean> = {};
  private caughtlistMap: Record<string, boolean> = {};

  constructor(
    private readonly authService: AuthService,
    private readonly watchlist: CaughtlistService,
    private readonly caughtlist: WishlistService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {


    this.authService.currentUser$
      .pipe(
        filter(user => user !== ''),
        switchMap(() => combineLatest([
          watchlist.list(),
          caughtlist.list(),
        ])),
        takeUntil(this.destroyed$),
      )
      .subscribe(([wishlist, caughtlist]) => {
        this.wishlistMap = wishlist
          .reduce((acc, val) => {
            acc[val.id] = true;
            return acc;
          }, {} as any);

        this.caughtlistMap = caughtlist
          .reduce((acc, val) => {
            acc[val.id] = true;
            return acc;
          }, {} as any);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
