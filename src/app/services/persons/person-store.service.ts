import { Observable, BehaviorSubject, map } from 'rxjs';
import { Osoba } from '../../../Types/Osoba';

// todo czemu to jest poza katalogiem?
export class PersonStoreService {
  private pList: Array<Osoba> = [
    { id: 1, imie: 'Janusz', nazwisko: 'Kowalski' },
    { id: 2, imie: 'Jan', nazwisko: 'Adamowski' },
    { id: 3, imie: 'Zbigniew', nazwisko: 'Karaś' },
    { id: 4, imie: 'Mariusz', nazwisko: 'Morgan' },
    { id: 5, imie: 'Marcin', nazwisko: 'Bandura' },
    { id: 6, imie: 'Adam', nazwisko: 'Ślusarz' },
    { id: 7, imie: 'Anna', nazwisko: 'Kowalska' },
    { id: 8, imie: 'Weronika', nazwisko: 'Kmiecik' },
    { id: 9, imie: 'Bożena', nazwisko: 'Krawiec' },
    { id: 10, imie: 'Malik', nazwisko: 'Montana' },
  ];
  private personsObs = new BehaviorSubject<Array<Osoba>>(this.pList);

  addNewPerson(toAdd: Osoba): void {
    this.pList.push(toAdd);
    this.personsObs.next(this.pList);
  }

  getPerson(id: number): Observable<Osoba | undefined> {
    return this.personsObs
      .asObservable()
      .pipe(map((val) => val.find((p) => p.id == id)));
  }

  getAllPersons(): Observable<Array<Osoba>> {
    return this.personsObs.asObservable();
  }

  getNewPerson(adding: Osoba): void {
    this.pList.push(adding);
    this.personsObs.next(this.pList);
  }

  deletePerson(deleting: number): void {
    const toDelete = this.pList.findIndex((val) => val.id === deleting);
    if (toDelete === -1) return;

    this.pList.splice(toDelete, 1);
    this.personsObs.next(this.pList);
  }
  updatePerson(updated: Osoba): void {
    const toUpdate = this.personsObs.value.findIndex(
      (val) => val.id === updated.id
    );
    if (toUpdate === -1) return;
    this.pList[toUpdate] = { ...updated };
    this.personsObs.next(this.pList);
  }
}
