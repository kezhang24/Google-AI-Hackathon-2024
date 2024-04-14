import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginResponse, User } from './types/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterComponent, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  authService = inject(AuthService);
  http = inject(HttpClient);
  title = 'app';

  ngOnInit(): void {
    this.http.get<{user: User}>('http://localhost:4000/api/user/current-user').subscribe({
      next: response => {
        const currentUser: LoginResponse = {
          email: response.user.email,
          user: response.user,
          accessToken: localStorage['token']
        }
        this.authService.currentUserSig.set(currentUser);
      },
      error: () => {
        this.authService.currentUserSig.set(null);
      }
    });
  }

  logout(): void {
    localStorage.setItem('token', '')
    this.authService.currentUserSig.set(null);
  }
}
