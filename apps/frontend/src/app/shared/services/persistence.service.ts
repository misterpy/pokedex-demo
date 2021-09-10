import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference,
  Query
} from '@angular/fire/compat/firestore';
import { PokemonInterface } from '../models/pokemon.interface';
import { AuthService } from '../../authentication/shared/auth.service';
import { BehaviorSubject } from 'rxjs';
import { PokemonListInterface } from '../models/pokemon-list.interface';
import { PokemonToListSerializer } from '../../list/shared/pokemon-to-list.serializer';

export class PersistenceService {
  private readonly collection: AngularFirestoreCollection<PokemonInterface>;

  list$: BehaviorSubject<PokemonListInterface[]> = new BehaviorSubject<PokemonListInterface[]>([]);
  listMap: Record<string, boolean> = {};

  constructor(
    readonly collectionName: string,
    readonly afs: AngularFirestore,
    readonly authService: AuthService,
  ) {
    this.collection = this.afs.collection<PokemonInterface>(this.collectionName);
  }

  initList(): void {
    this.afs
      .collection<PokemonInterface>(this.collectionName, ref => {
        let query: CollectionReference | Query = ref;
        query = query.where('user', '==', this.authService.currentUser$.value);
        return query;
      })
      .valueChanges()
      .subscribe(list => {
        this.list$.next(list.map(PokemonToListSerializer.serialize));

        this.listMap = list
          .reduce((acc, val) => {
            acc[val.id] = true;
            return acc;
          }, {} as any);
      });
  }

  add(item: PokemonInterface): void {
    this.collection.doc(item.id).set({
      ...item,
      user: this.authService.currentUser$.value,
    });
  }

  remove(item: PokemonInterface): void {
    this.collection.doc(item.id).delete();
  }

  isAdded(id: string): boolean {
    return this.listMap[id];
  }
}
