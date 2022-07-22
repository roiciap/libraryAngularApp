import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import BaseData from 'src/models/BaseData';

@Injectable({
  providedIn: 'root',
})
export default class DataStorage<T extends BaseData> {
  private dataList: Array<T> = [];
  private dataBS: BehaviorSubject<Array<T>> = new BehaviorSubject<Array<T>>(
    this.dataList
  );
  private data$: Observable<Array<T>> = this.dataBS.asObservable();

  get(id: string): Observable<T> {
    return this.data$.pipe(
      map((val) => {
        const found = val.find((record) => record.id === id);
        if (found === undefined) throw new Error('couldnt find an object');
        return found;
      })
    );
  }
  add(obj: T): Observable<T> {
    //generuj ID
    this.dataList.push(obj);
    this.dataBS.next(this.dataList);
    return of(obj);
  }
  delete(id: string): Observable<Array<T>> {
    const index = this.dataList.findIndex((val) => val.id === id);
    if (index < 0) throw new Error('cant find object to delete');
    this.dataList.splice(index, 1);
    this.dataBS.next(this.dataList);
    return this.data$;
  }
  //returns whole array
  getAll(): Observable<Array<T>> {
    return this.data$;
  }
  //returns whole array up to date
  refresh(): Observable<Array<T>> {
    this.dataBS.next(this.dataList);
    return this.getAll();
  }
}
