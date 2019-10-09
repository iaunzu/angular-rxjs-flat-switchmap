import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class AppService {
 
  getUser(id: number): Observable<User> {
    return timer( id ).pipe(mapTo({id, name: `TestName ${id}`}));
  }

}