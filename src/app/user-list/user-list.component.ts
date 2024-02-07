import { Component, ElementRef, Host, Injectable, Input, ViewChild } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

@Component({
  selector: '[user-list]',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {
  @Input() index!: number;
  @Input() user!: User;
  parent: DashboardComponent;
  formMode: boolean = false;

  constructor(@Host() parent: DashboardComponent) {
    this.parent = parent;
  }

  toggleFormMode() {
    this.formMode = !this.formMode;
  }

  edit() {
    this.parent.editUser(this.user);
  }
}
