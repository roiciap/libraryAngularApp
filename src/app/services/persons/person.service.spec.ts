import { of } from 'rxjs';
import { Osoba } from 'src/Types/Osoba';
import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;
  let personStoreSrv: any;
  const persons: Array<Osoba> = [
    { id: '1', imie: 'Janusz', nazwisko: 'Kowalski' },
    { id: '2', imie: 'Jan', nazwisko: 'Adamowski' },
    { id: '3', imie: 'Zbigniew', nazwisko: 'Karaś' },
    { id: '4', imie: 'Mariusz', nazwisko: 'Morgan' },
    { id: '5', imie: 'Marcin', nazwisko: 'Bandura' },
    { id: '6', imie: 'Adam', nazwisko: 'Ślusarz' },
    { id: '7', imie: 'Anna', nazwisko: 'Kowalska' },
    { id: '8', imie: 'Weronika', nazwisko: 'Kmiecik' },
    { id: '9', imie: 'Bożena', nazwisko: 'Krawiec' },
    { id: '10', imie: 'Malik', nazwisko: 'Montana' },
  ];

  beforeEach(() => {
    personStoreSrv = {
      addNewPerson: jest.fn(),
      getPerson: jest.fn(),
      getAllPersons: jest.fn(),
      getNewPerson: jest.fn(),
      deletePerson: jest.fn(),
      updatePerson: jest.fn(),
    };
    service = new PersonService(personStoreSrv);
    jest.spyOn(personStoreSrv, 'getAllPersons').mockReturnValue(of(persons));
  });
  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should call getAllPersons', () => {
    service.getAllPersons();
    expect(personStoreSrv.getAllPersons).toBeCalled();
  });
  it('should return all', (done) => {
    service.getAllPersons().subscribe((data) => {
      expect(data).toEqual(persons);
      done();
    });
  });
  it('should return specified person', (done) => {
    const testName = 'Janusz';
    service.getSearchedPersons(testName).subscribe((data) => {
      expect(data).toEqual(
        persons.filter((person) => person.imie === testName)
      );
      done();
    });
  });
  //add remove update
  it('should add new person', () => {
    const testData = { imie: 'Janko', nazwisko: 'Janeczko' };
    expect(service.addPerson(testData));
  });

  it('should remove person', () => {
    const testId = '1';
    expect(service.deletePerson(testId));
    expect(service.getPerson(testId)).toBeFalsy();
  });
  it('should not remove person', () => {
    const testId = 'a'; //number
    expect(service.deletePerson(testId));
    expect(service.getPerson(testId)).toBeFalsy();
  });
  it('should update person', (done) => {
    const testData = { id: '1', imie: 'TestImie', nazwisko: 'TestNazwisko' };
    expect(service.updatePerson(testData));
    service.getSearchedPersons(testData.imie).subscribe((data) => {
      expect(data).toEqual(
        persons.filter((person) => person.imie === testData.imie)
      );
      done();
    });
  });
});
