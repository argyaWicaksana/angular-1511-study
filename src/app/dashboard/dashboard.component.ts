import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  username: string;
  email: string;
  role?: string;
  password?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  users: any;
  // body: User = {
  //   username: 'IlhamGod',
  //   email: 'ilham@gmail.com',
  //   password: 'password',
  // }
  constructor(private http: HttpClient) {
    this.users = [];
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/user').subscribe(response => {
      this.users = response;
      // console.log(response);
    }, (error: any) => {
      console.log(error);
    })
  }

}
