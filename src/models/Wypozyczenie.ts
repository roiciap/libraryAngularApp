import BaseData from '../shared/models/BaseData';

export interface Wypozyczenie extends BaseData {
  idOsoba: string;
  idKsiazka: string;
  dataPrzyjecia: Date;
  dataOddania: Date | null;
}
