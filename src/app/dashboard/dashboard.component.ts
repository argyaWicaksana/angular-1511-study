import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  password?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  users: any;

  constructor(private http: HttpClient) {
    this.users = [];
  }

  addUser(user: Omit<User, 'id'>) {
    this.http.post('http://localhost:3000/user', user).subscribe((_) => {
      this.ngOnInit();
    }, (error: any) => {
      console.log(error)
    })
  }

  deleteUser(id: number) {
    this.http.delete(`http://localhost:3000/user/${id}`).subscribe((_) => {
      this.ngOnInit();
    })
  }

  editUser(user: User) {
    this.http.put(`http://localhost:3000/user/${user.id}`, user).subscribe((_) => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/user').subscribe(response => {
      this.users = response;
    }, (error: any) => {
      console.log(error);
    })
  }

}
