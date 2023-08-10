import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];  
  private usersSubject = new BehaviorSubject<any[]>([]);

  constructor() {}

  getUsersSubject() {
    return this.usersSubject.asObservable();
  }

  addUser(user: any) {
    this.users.push(user);
    this.usersSubject.next([...this.users]);
  }
 
}
