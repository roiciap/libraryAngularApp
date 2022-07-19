export interface Wypozyczenie {
  id: string;
  idOsoba: string;
  idKsiazka: string;
  dataPrzyjecia: Date;
  dataOddania: Date | null;
}
