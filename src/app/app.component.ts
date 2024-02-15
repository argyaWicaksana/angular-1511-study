import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(protected authService: AuthService, private router: Router) {
  }
  title = 'angular-1511';

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
