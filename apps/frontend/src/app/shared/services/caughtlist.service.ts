import { Injectable } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../authentication/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CaughtlistService extends PersistenceService {
  constructor(
    readonly afs: AngularFirestore,
    readonly authService: AuthService,
  ) {
    super('caughtlist', afs, authService);
  }
}
