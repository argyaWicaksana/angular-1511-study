import { ChangeDetectorRef, Component, Host, inject, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  userFg!: FormGroup;
  private modalService = inject(NgbModal);

  constructor(private fb: FormBuilder, private http: HttpClient, private chRef: ChangeDetectorRef) { }

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
      console.log(this.userFg.value);
      this.http.post('http://localhost:3000/user', this.userFg.value).subscribe((response: any) => {
        console.log(response);
        this.chRef.detectChanges();
        
        // let token = localStorage.getItem('accessToken');
        // console.log(token)
      }, (error: any) => {
        // console.log(error);
        console.log(error.error.message);
      })
    }
  }

}
