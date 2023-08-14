import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', age: 30 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', age: 28 }, 
  ];

  private usersSubject = new BehaviorSubject<any>(this.users);

  constructor() {}

  getUsersSubject() {
    return this.usersSubject.asObservable();
  }

  getUserById(id: number): any | undefined {
    return this.users.find((user: { id: number; }) => user.id === id);
  }

  addUser(user: any) {
    user.id = this.generateUniqueId();
    this.users.push(user);
    this.notifyUsersChange();
  }

  updateUser(user: any) {
    const index = this.users.findIndex((u: { id: any; }) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.notifyUsersChange();
    }
  }

  private notifyUsersChange() {
    this.usersSubject.next([...this.users]);
  }

  private generateUniqueId(): number {
    return Math.max(...this.users.map((user: { id: any; }) => user.id)) + 1;
  }
}
