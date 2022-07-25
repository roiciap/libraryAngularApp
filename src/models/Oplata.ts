import BaseData from '../shared/models/BaseData';

export interface Oplata extends BaseData {
  idWypozyczenia: string;
  kwota: number;
  oplacone: boolean;
}
