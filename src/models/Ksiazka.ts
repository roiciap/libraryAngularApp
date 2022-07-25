import BaseData from '../shared/models/BaseData';

export interface Ksiazka extends BaseData {
  nazwa: string;
  autor: string;
  rokWydania: number;
  dostepnosc: number;
}
