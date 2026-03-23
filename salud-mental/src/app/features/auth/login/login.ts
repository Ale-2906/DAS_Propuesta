import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  success = '';
  loading = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = '';
    this.success = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    this.loading = true;

    setTimeout(() => {
      const result = this.authService.login(this.email, this.password);
      this.loading = false;

      if (!result.ok) {
        this.error = result.message;
        return;
      }

      this.success = result.message;
      this.router.navigate(['/dashboard']);
    }, 600);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}