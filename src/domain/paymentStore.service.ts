import { Injectable } from '@angular/core';
import { Oplata } from 'src/models/Oplata';
import DataStorage from './dataStorage.service';

@Injectable({
  providedIn: 'root',
})
export default class PersonStore extends DataStorage<Oplata> {}
