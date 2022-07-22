import { Injectable } from '@angular/core';
import { Osoba } from 'src/models/Osoba';
import DataStorage from './dataStorage.service';

@Injectable({
  providedIn: 'root',
})
export default class PersonStore extends DataStorage<Osoba> {}
