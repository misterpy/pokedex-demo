import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { QueryService } from '../../list/shared/query.service';
import { PokemonInterface } from '../../shared/models/pokemon.interface';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'pokedex-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {
  private readonly destroyed$: Subject<boolean> = new Subject<boolean>();

  isLoading$: Subject<boolean> = new Subject<boolean>();
  foundPokemon: PokemonInterface | null = null;
  searchControl: FormControl = new FormControl('');

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement> | null = null;

  constructor(
    private readonly query: QueryService,
    private readonly router: Router,
  ) {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        tap((value: any) => {
          if (typeof value === 'object') {
            if (this.searchInput && this.searchInput.nativeElement) {
              this.searchInput.nativeElement.value = '';
            }
          }
        }),
        debounceTime(300),
        filter(value => value !== null && value !== ''),
        tap((value: any) => {
          if (typeof value === 'object') {
            this.router.navigate(['/details', value.id]);
          }
        }),
        tap(() => this.isLoading$.next(true)),
        switchMap(name => this.query.details(name)),
        takeUntil(this.destroyed$),
      )
      .subscribe(pokemon => {
        this.foundPokemon = pokemon;
        this.isLoading$.next(false);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
