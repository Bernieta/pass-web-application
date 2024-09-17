import { Injectable } from '@angular/core';
import { database } from '../config/fire.config';
import { onValue, ref, set } from 'firebase/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor() {}

  /**
   * Se encarga de actualizar el valor de encendido y apagado
   * @param value Valor que define el apagado y encendido
   */
  public powerApp(value: number) {
    const query = ref(database, 'apagar');
    set(query, value);
  }

  /**
   * Se encarga de obtener el valor del encendido y apagados
   * @returns
   */
  public readPowerApp(): Observable<number> {
    const query = ref(database, 'apagar');
    return new Observable<number>((observer) => {
      onValue(
        query,
        (snapshot) => {
          if (!snapshot.exists()) observer.next(-1);
          observer.next(snapshot.val());
        },
        (error) => observer.error(error)
      );
    });
  }

  public activeAndDesactiveDateTime(
    startDateTime: string,
    endDateTime: string
  ) {
    const query1 = ref(database, 'activar');
    const query2 = ref(database, 'desactivar');
    set(query1, startDateTime);
    set(query2, endDateTime);
  }

  public getActiveDateTime(): Observable<string> {
    const query = ref(database, 'activar');
    return new Observable<string>((observer) => {
      onValue(
        query,
        (snap) => {
          observer.next(snap.val());
        },
        (error) => observer.error(error)
      );
    });
  }

  public getDesactiveDateTime(): Observable<string> {
    const query = ref(database, 'desactivar');
    return new Observable<string>((observer) => {
      onValue(
        query,
        (snap) => {
          observer.next(snap.val());
        },
        (error) => observer.error(error)
      );
    });
  }

  public disableAlarm(value: number) {
    const query = ref(database, 'alarma');
    set(query, value);
  }

  public getValueAlarm(): Observable<number> {
    const query = ref(database, 'alarma');
    return new Observable<number>((observer) => {
      onValue(
        query,
        (snap) => {
          observer.next(snap.val());
        },
        (error) => observer.error(error)
      );
    });
  }
}
