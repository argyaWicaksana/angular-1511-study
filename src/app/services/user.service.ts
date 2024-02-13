import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../types";
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user').pipe(
      catchError(this.handleError<User[]>([]))
    );
  }

  addUser(user: Omit<User, 'id'>): Observable<any> {
    return this.http.post('http://localhost:3000/user', user).pipe(
      catchError(this.handleError<any>())
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`http://localhost:3000/user/${user.id}`, user).pipe(
      catchError(this.handleError<any>())
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/user/${id}`).pipe(
      catchError(this.handleError<any>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
