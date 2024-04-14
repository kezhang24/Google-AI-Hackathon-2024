import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout(): void {
    localStorage.setItem('token', '')
    this.authService.currentUserSig.set(null);
    this.router.navigate(['/']);
  }

  getUsername(): string | undefined {
    return this.authService.currentUserSig()?.user.username;
  }
}
