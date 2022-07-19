import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  getSearchedPersons(searched: string): Observable<Array<Osoba>> {
    return this.personStoreSrv
      .getAllPersons()
      .pipe(
        map((val) =>
          val.filter((person: { imie: string; nazwisko: string }) =>
            (person.imie + '' + person.nazwisko)
              .toLocaleLowerCase()
              .includes(searched.toLocaleLowerCase())
          )
        )
      );
  }

  addPerson(toAdd: { imie: string; nazwisko: string }): void {
    let toAddId: string = '';
    toAddId = Math.random().toString(36).substring(2, 9);
    this.personStoreSrv.addNewPerson({ id: toAddId, ...toAdd });
  }
  updatePerson(updated: Osoba): void {
    this.personStoreSrv.updatePerson(updated);
  }
  getPerson(id: string): Observable<Osoba | undefined> {
    return this.personStoreSrv.getPerson(id);
  }
  deletePerson(deleteId: string): void {
    this.personStoreSrv.deletePerson(deleteId);
  }
}
