import BaseData from './BaseData';

export interface Oplata extends BaseData {
  idWypozyczenia: string;
  kwota: number;
  oplacone: boolean;
}
