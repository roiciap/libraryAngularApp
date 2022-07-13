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
  private persons = new BehaviorSubject<Array<Osoba>>(this.pList);

  addNewPerson(toAdd: Osoba): void {
    this.pList.push(toAdd);
    this.persons.next(this.pList);
  }

  getAllPersons(): Observable<Array<Osoba>> {
    return this.persons.asObservable();
  }

  getNewPerson(adding: Osoba): void {
    this.persons.value.push(adding);
  }

  deletePerson(deleting: number): void {
    const toDelete = this.persons.value.findIndex((val) => val.id === deleting);
    if (toDelete === -1) return;
    this.persons.value.splice(toDelete, 1);
  }
  updatePerson(updated: Osoba): void {
    const toUpdate = this.persons.value.findIndex(
      (val) => val.id === updated.id
    );
    if (toUpdate === -1) return;
    this.pList[toUpdate] = { ...updated };
    this.persons.next(this.pList);
  }
}
