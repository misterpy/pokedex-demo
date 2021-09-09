import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    this.init();
  }

  init(): void {
    const userId = localStorage.getItem('user');

    if (userId === undefined || userId === null) {
      return;
    }

    this.currentUser$.next(userId);
  }

  login(userId: string): void {
    localStorage.setItem('user', userId);
    this.currentUser$.next(userId);
  }

  isLoggedIn(): boolean {
    return this.currentUser$.value !== '';
  }
}
