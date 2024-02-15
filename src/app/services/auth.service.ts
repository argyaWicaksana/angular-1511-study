import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private role: 'admin' | 'user' | 'guest' = 'guest';
  private http: HttpClient;
  private router: Router;
  private jwtHelper: JwtHelperService;

  constructor(http: HttpClient, router: Router, jwtHelper: JwtHelperService) {
    this.http = http;
    this.router = router;
    this.jwtHelper = jwtHelper;
  }

  login(username: string, password: string) {
    this.http.post<LoginResponse>('http://localhost:3000/auth/login', { username, password }).subscribe({
      next: ({ accessToken }: LoginResponse) => {
        localStorage.setItem('accessToken', accessToken);
        this.router.navigate(['dashboard']);
      },
      error: () => this.router.navigate([''])
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.role = 'guest';
  }
}
