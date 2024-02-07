import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  users: any;
  private modalService = inject(NgbModal);
  @ViewChild(ModalComponent) modalComp!: ModalComponent;

  constructor(private http: HttpClient) {
    this.users = [];
  }

  deleteUser(id: number) {
    this.http.delete(`http://localhost:3000/user/${id}`).subscribe((_) => {
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

  openModal() {
    this.modalService.open(this.modalComp);
  }

}
