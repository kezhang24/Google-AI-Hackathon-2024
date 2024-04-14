import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginResponse } from '../types/user.interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authServce = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    this.http.post<LoginResponse>('http://localhost:4000/api/user/signup',
      this.form.getRawValue() 
    )
    .subscribe((response) => {
      console.log('response', response);
      localStorage.setItem('token', response.accessToken);
      this.authServce.currentUserSig.set(response);
      this.router.navigateByUrl('/');
    })
  }
}
