import { Injectable } from '@angular/core';
import { onValue, push, ref, remove, set } from 'firebase/database';
import { database } from '../config/fire.config';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  public getUsers(): Observable<User[]> {
    const query = ref(database, 'usuarios');
    return new Observable<User[]>((observer) => {
      onValue(
        query,
        (snap) => {
          if (!snap.exists()) observer.next([]);

          const values = Object.entries(snap.val()).map(([key, username]) => ({
            key,
            username,
          })) as User[];
          observer.next(values);
        },
        (error) => observer.error(error)
      );
    });
  }

  public getUserCall(): Observable<string> {
    const query = ref(database, 'usuarioLlamadas');
    return new Observable<string>((observer) => {
      onValue(
        query,
        (snap) => {
          const user = snap.val() as string;
          observer.next(user);
        },
        (error) => observer.error(error)
      );
    });
  }

  public registerUser(newUser: string) {
    if (!newUser.includes('@')) newUser = `@${newUser}`;
    const query = ref(database, 'usuarios');
    push(query, newUser);
  }

  public registerUserCall(username: string) {
    const query = ref(database, 'usuarioLlamadas');
    set(query, username);
  }

  public deleteUser(key: string) {
    const query = ref(database, `usuarios/${key}`);
    remove(query);
  }
}
