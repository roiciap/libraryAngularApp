import { Injectable } from '@angular/core';
import { Osoba } from 'src/models/Osoba';
import DataStorage from '../shared/domain/dataStorage.service';

@Injectable({
  providedIn: 'root',
})
export default class PersonStore extends DataStorage<Osoba> {}
