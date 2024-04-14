import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginResponse } from '../types/user.interface';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  http = inject(HttpClient)

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.http.post<LoginResponse>('http://localhost:4000/api/user/login',
      this.form.getRawValue() 
    )
    .subscribe((response) => {
      console.log('response', response);
      localStorage.setItem('token', response.accessToken);
      this.authService.currentUserSig.set(response);
      this.router.navigateByUrl('/');
    })
  }
}
