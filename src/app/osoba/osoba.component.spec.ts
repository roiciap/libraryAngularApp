import { of } from 'rxjs';
import { Osoba } from 'src/Types/Osoba';
import { OsobaComponent } from './osoba.component';

describe('OsobaComponent', () => {
  let component: OsobaComponent;
  let personService: any;
  let stringUtils: any;
  const people: Array<Osoba> = [
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
    personService = {
      updatePerson: jest.fn(),
      addPerson: jest.fn(),
      getSearchedPersons: jest.fn(),
      getAllPersons: jest.fn(),
    };
    stringUtils = {
      capitWord: jest.fn(),
    };
    jest.spyOn(personService, 'getAllPersons').mockReturnValue(of(people));
    jest.spyOn(stringUtils, 'capitWord').mockReturnValue('ABC');
    jest
      .spyOn(personService, 'getSearchedPersons')
      .mockReturnValue(
        of(
          people.filter((val) =>
            (val.imie + ' ' + val.nazwisko).toLowerCase().includes('z')
          )
        )
      );
    component = new OsobaComponent(personService, stringUtils);
    component.ngOnInit();
  });
  it('should get all persons', () => {
    expect(component.persons).toEqual(people);
  });
  it('should find people with "z" in name or surname', () => {
    component.personSearch('z');
    expect(component.persons).toEqual(
      people.filter((val) =>
        (val.imie + ' ' + val.nazwisko).toLowerCase().includes('z')
      )
    );
  });
  it('should set input to empty', () => {
    component.addPerson();
    expect(component.nameInput || component.surnameInput).toBeFalsy();

    component.nameInput = 'imie';
    component.surnameInput = 'nazwisko';
    component.addPerson();
    expect(component.nameInput || component.surnameInput).toBeFalsy();

    component.nameInput = 'imie';
    component.surnameInput = 'nazwisko';
    component.toggleAddBar();
    expect(component.nameInput || component.surnameInput).toBeFalsy();
  });

  it('should set inputs to edit target values then add it and set edit context to null', () => {
    component.toggleEditBar(people[1]);
    expect(
      component.nameInput === people[1].imie &&
        component.surnameInput === people[1].nazwisko &&
        component.editContext
    ).toBeTruthy();
    component.updatePerson();
    expect(component.editContext).toBeFalsy();
  });

  it('should hide edit bar if target is already editedContext', () => {
    component.toggleEditBar(people[1]); //open
    expect(component.editContext).toBeTruthy();
    component.toggleEditBar(people[1]); //close
    expect(component.editContext).toBeFalsy();
  });
  it('shouldnt update person if editContext is null ', () => {
    //user shouldnt even be able to press update button if it is
    const updatePerson = jest.spyOn(personService, 'updatePerson');
    component.updatePerson();
    expect(updatePerson).not.toBeCalled();
  });
});
