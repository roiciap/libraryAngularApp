import { Injectable } from '@angular/core';
import { Wypozyczenie } from 'src/models/Wypozyczenie';
import DataStorage from '../shared/domain/dataStorage.service';

@Injectable({
  providedIn: 'root',
})
export default class LoanStore extends DataStorage<Wypozyczenie> {}
