import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Osoba } from 'src/Types/Osoba';
import { PersonStoreService } from './person-store.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private readonly personStoreSrv: PersonStoreService) {}

  getAllPersons(): Observable<Array<Osoba>> {
    return this.personStoreSrv.getAllPersons();
  }
}
