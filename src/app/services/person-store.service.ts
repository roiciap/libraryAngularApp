import { Observable, BehaviorSubject } from 'rxjs';
import { Osoba } from './../../Types/Osoba';

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

  getAllPersons(): Observable<Array<Osoba>> {
    return this.personsObs.asObservable();
  }

  getNewPerson(adding: Osoba): void {
    this.personsObs.value.push(adding);
  }

  deletePerson(deleting: number): void {
    const toDelete = this.personsObs.value.findIndex(
      (val) => val.id === deleting
    );
    if (toDelete === -1) return;

    this.personsObs.value.splice(toDelete, 1);
    this.personsObs.next(this.pList);
    console.log(this.pList);
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
