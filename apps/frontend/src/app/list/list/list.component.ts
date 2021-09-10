import { Component, OnDestroy } from '@angular/core';
import { CaughtlistService } from '../../shared/services/caughtlist.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../../authentication/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryService } from '../shared/query.service';
import { PokemonListInterface } from '../../shared/models/pokemon-list.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'pokedex-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
  private readonly destroyed$: Subject<boolean> = new Subject<boolean>();
  private currentPage = 1;

  list$: BehaviorSubject<PokemonListInterface[]> = new BehaviorSubject<PokemonListInterface[]>([]);
  totalCount = 0;
  pageSize = 0;

  constructor(
    readonly caughtlist: CaughtlistService,
    readonly wishlist: WishlistService,
    private readonly authService: AuthService,
    private readonly query: QueryService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.pageSize = this.query.limit;

    this.route.queryParamMap
      .pipe(
        tap(queryParamMap => {
          if (queryParamMap.get('page') === null) {
            this.onNavigate(this.currentPage);
          }
        }),
        filter(queryParamMap => queryParamMap.get('page') !== null),
        map(queryParamMap => Number(queryParamMap.get('page'))),
        switchMap(page => this.query.list(page)),
        takeUntil(this.destroyed$),
      )
      .subscribe(list => {
        this.list$.next(list);
        this.totalCount = this.query.getTotalCount();
      });

    this.authService.currentUser$
      .pipe(
        filter(user => user !== ''),
        takeUntil(this.destroyed$),
      )
      .subscribe(() => {
        this.wishlist.initList();
        this.caughtlist.initList();
      });
  }

  onNavigate(page: number): void {
    this.router
      .navigate(['list'], { queryParams: { page } });
  }

  onPageChange({ pageIndex }: PageEvent): void {
    this.currentPage = pageIndex + 1;
    this.onNavigate(this.currentPage);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
