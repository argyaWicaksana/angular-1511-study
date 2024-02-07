import { ChangeDetectorRef, Component, Host, inject, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  userFg!: FormGroup;
  parent: DashboardComponent;
  private modalService = inject(NgbModal);

  constructor(private fb: FormBuilder, private http: HttpClient, @Host() parent: DashboardComponent) {
    this.parent = parent;
  }

  ngOnInit(): void {
    this.userFg = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
    })
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    if (this.userFg.valid) {
      this.parent.addUser(this.userFg.value);
    }
  }

}
