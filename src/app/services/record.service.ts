import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from '../interfaces/records';
import { onValue, ref } from 'firebase/database';
import { database } from '../config/fire.config';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor() {}

  public getRecords(): Observable<Record[]> {
    const query = ref(database, 'historial');
    return new Observable<Record[]>((observer) => {
      onValue(
        query,
        (snap) => {
          const values = Object.values(snap.val()) as Record[];
          observer.next(values.reverse());
        },
        (error) => observer.error(error)
      );
    });
  }
}
