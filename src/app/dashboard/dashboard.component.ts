import { Component, OnInit } from '@angular/core';
import { User } from "../types";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  users: any;

  constructor(private userService: UserService) {
    this.users = [];
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response: User[]) => this.users = response
    })
  }

  ngOnInit() {
    this.getUsers();
  }

}
