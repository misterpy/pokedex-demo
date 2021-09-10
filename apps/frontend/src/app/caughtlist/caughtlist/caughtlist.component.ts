import { Component, OnDestroy } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../authentication/shared/auth.service';
import { Subject } from 'rxjs';
import { CaughtlistService } from '../../shared/services/caughtlist.service';

@Component({
  selector: 'pokedex-caughtlist',
  templateUrl: './caughtlist.component.html',
  styleUrls: ['./caughtlist.component.scss']
})
export class CaughtlistComponent implements OnDestroy {
  private readonly destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    readonly caughtlist: CaughtlistService,
    private readonly authService: AuthService,
  ) {
    this.authService.currentUser$
      .pipe(
        filter(user => user !== ''),
        takeUntil(this.destroyed$),
      )
      .subscribe(() => {
        this.caughtlist.initList();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
