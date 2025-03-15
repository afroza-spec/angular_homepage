import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.apiService.loginUser(credentials).subscribe({
        next: (response: any) => {
          if (response.success) {
            alert("Login Successful!");
            this.router.navigate(['/dashboard']); // ✅ Navigate to Dashboard
          } else {
            this.errorMessage = "User is not registered!";
          }
        },
        error: (error: any) => {
          this.errorMessage = "Invalid login credentials!";
        }
      });
    }
  }


}
