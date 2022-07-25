import { Injectable } from '@angular/core';
import { Ksiazka } from 'src/models/Ksiazka';
import DataStorage from '../shared/domain/dataStorage.service';

@Injectable({
  providedIn: 'root',
})
export default class BookStore extends DataStorage<Ksiazka> {}
