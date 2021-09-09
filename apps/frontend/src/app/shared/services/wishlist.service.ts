import { Injectable } from '@angular/core';
import { AuthService } from '../../authentication/shared/auth.service';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends PersistenceService {
  constructor(
    readonly afs: AngularFirestore,
    readonly authService: AuthService,
  ) {
    super('wishlist', afs, authService);
  }
}
