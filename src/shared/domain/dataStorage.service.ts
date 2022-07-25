import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import BaseData from 'src/shared/models/BaseData';

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
    obj.id = performance.now().toString(36); //
    this.dataList.push(obj);
    this.dataBS.next(this.dataList);
    return of(obj);
  }
  delete(id: string): boolean {
    const index = this.dataList.findIndex((val) => val.id === id);
    if (index < 0) return false;
    this.dataList.splice(index, 1);
    this.dataBS.next(this.dataList);
    return true;
  }
  update(obj: T): Observable<T> {
    const index = this.dataList.findIndex((data) => data.id === obj.id);
    if (index < 0) throw new Error('Couldnt find data to update');
    this.dataList[index] = obj;
    return of(obj);
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
