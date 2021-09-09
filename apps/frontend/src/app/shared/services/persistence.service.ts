import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference,
  Query
} from '@angular/fire/compat/firestore';
import { PokemonInterface } from '../models/pokemon.interface';
import { AuthService } from '../../authentication/shared/auth.service';
import { Observable } from 'rxjs';

export class PersistenceService {
  private readonly collection: AngularFirestoreCollection<PokemonInterface>;

  constructor(
    readonly collectionName: string,
    readonly afs: AngularFirestore,
    readonly authService: AuthService,
  ) {
    this.collection = this.afs.collection<PokemonInterface>(this.collectionName);
  }

  list(): Observable<PokemonInterface[]> {
    return this.afs
      .collection<PokemonInterface>(this.collectionName, ref => {
        let query: CollectionReference | Query = ref;
        query = query.where('user', '==', this.authService.currentUser$.value);
        return query;
      })
      .valueChanges();
  }

  add(item: PokemonInterface): void {
    this.collection.doc(item.id).set(item);
  }

  remove(item: PokemonInterface): void {
    this.collection.doc(item.id).delete();
  }
}
