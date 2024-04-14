import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginResponse } from '../types/user.interface';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage: String | undefined = undefined;

  ngOnInit(): void {
    if(this.authService.currentUserSig()) {
      this.router.navigateByUrl('/');
    }
  }

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    this.http.post<LoginResponse>('http://localhost:4000/api/user/signup',
      this.form.getRawValue() 
    )
    .subscribe((response) => {
      console.log('response', response);
      localStorage.setItem('token', response.accessToken);
      this.authService.currentUserSig.set(response);
      this.router.navigateByUrl('/');
      },
      (error) => {
        if(error && error.error && error.error.error) {
          this.errorMessage = error.error.error;
        }
      }
  
    )
  }
}
