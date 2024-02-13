import { Component, Host, Input } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserService } from '../services/user.service';
import { User } from "../types";

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

  constructor(@Host() parent: DashboardComponent, private userService: UserService) {
    this.parent = parent;
  }

  toggleFormMode() {
    this.formMode = !this.formMode;
  }

  editUser() {
    this.userService.updateUser(this.user).subscribe(() => {
      this.parent.getUsers();
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.parent.getUsers();
    });
  }
}
