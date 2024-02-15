import { Component, Host, inject, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserService } from '../services/user.service';
import { User } from '../types';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  userFg!: FormGroup;
  parent: DashboardComponent;
  @Input() user: User | null = null;
  private modalService = inject(NgbModal);

  constructor(private fb: FormBuilder, @Host() parent: DashboardComponent, private userService: UserService) {
    this.parent = parent;
  }

  ngOnInit(): void {
    this.userFg = this.fb.group({
      username: [this.user?.username ?? '', [Validators.required, Validators.minLength(3)]],
      email: [this.user?.email ?? '', [Validators.required, Validators.email]],
      ...(this.user === null) && { password: ['', [Validators.required, Validators.minLength(6)]] },
      role: [this.user?.role ?? '', [Validators.required]],
    })
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    if (!this.userFg.valid) {
      return;
    }

    if (this.user === null) {
      this.userService.addUser(this.userFg.value).subscribe(() => {
        this.parent.getUsers();
      });
    } else {
      this.userFg.value.id = this.user.id;
      this.userService.updateUser(this.userFg.value).subscribe(() => {
        this.parent.getUsers();
      });
    }
  }

  showErrorCss(field: string) {
    return (this.userFg.get(field)?.invalid && (this.userFg.get(field)?.touched || this.userFg.get(field)?.dirty)) ? 'is-invalid' : '';
  }
}
