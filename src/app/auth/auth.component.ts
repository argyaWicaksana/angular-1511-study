import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Alert {
  type: string;
  message: string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginFg!: FormGroup;
  showAlert:boolean = false;
  alert!: Alert;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginFg = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {
    if (this.loginFg.valid) {
      this.http.post('http://localhost:3000/auth/login', this.loginFg.value).subscribe((response: any) => {
        localStorage.setItem('accessToken', response.accessToken);
        window.location.href = "http://localhost:4200/dashboard";
        this.router.navigate(['dashboard']);
        // let token = localStorage.getItem('accessToken');
        // console.log(token)
      }, (error: any) => {
        this.alert = {
          type: 'danger',
          message: error.error.message,
        }
        this.showAlert = true;
        // console.log(error);
        console.log(error.error.message);
      })
    }
  }
}
