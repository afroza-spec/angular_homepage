import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    // ✅ Apply the custom validator correctly
    this.registerForm.setValidators(this.matchPasswords);
  }

  // Custom validator for matching passwords
  matchPasswords(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const userData = {
        FirstName: this.registerForm.value.firstName,
        LastName: this.registerForm.value.lastName,
        Email: this.registerForm.value.email,
        PasswordHash: this.registerForm.value.password
      };

      console.log("✅ Sending Data to API:", userData);

      this.apiService.registerUser(userData).subscribe(
        response => {
          console.log("✅ API Response:", response); // ✅ Log JSON response
          alert(response.message); // ✅ Show JSON message instead of parsing error
        },
        error => {
          console.error('❌ ERROR:', error);
          alert('Error: ' + error.error.message);
        }
      );
    }
  }
}
