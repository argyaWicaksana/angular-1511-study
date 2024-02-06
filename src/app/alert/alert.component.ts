import { Component, Input, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

interface Alert {
  type: string;
  message: string
}

@Component({
  selector: 'app-alert',
  template: `
  <ngb-alert *ngIf="!isClosed" [type]="alert.type" (closed)="close()">{{ alert.message }}</ngb-alert>
  `,
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  isClosed: boolean = false;

  @Input() alert: Alert = {
    type: 'info',
    message: '',
  };

  close() {
    this.isClosed = true;
  }
}
