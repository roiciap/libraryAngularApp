import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Oplata } from 'src/models/Oplata';
import DataStorage from '../shared/domain/dataStorage.service';

@Injectable({
  providedIn: 'root',
})
export default class PaymentStore extends DataStorage<Oplata> {}
