export type Wypozyczenie = {
  id: number;
  idOsoba: number;
  idKsiazka: number;
  dataPrzyjecia: Date;
  dataOddania: Date | null;
};
