import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styles: [`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%);
    }

    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .auth-wrapper {
      width: 100%;
      max-width: 28rem;
    }

    .auth-card {
      background: white;
      border-radius: 1rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      padding: 2rem;
    } 

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .auth-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%);
      border-radius: 50%;
      margin-bottom: 1rem;
    }

    .auth-icon svg {
      width: 2rem;
      height: 2rem;
      color: white;
    }

    .auth-title {
      font-size: 1.875rem;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .auth-subtitle {
      color: #4b5563;
      font-size: 0.875rem;
    }

    .alert-error {
      margin-bottom: 1rem;
      padding: 0.75rem;
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #dc2626;
    }

    .alert-error svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .input-wrapper {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      width: 1.25rem;
      height: 1.25rem;
      pointer-events: none;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      outline: none;
      transition: all 0.2s;
      font-family: inherit;
    }

    .form-input.with-left-icon {
      padding-left: 2.75rem;
    }

    .form-input.with-right-icon {
      padding-right: 2.75rem;
    }

    .form-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-input.error {
      border-color: #ef4444;
    }

    .toggle-password {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      transition: color 0.2s;
    }

    .toggle-password:hover {
      color: #4b5563;
    }

    .toggle-password svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-top: 0.25rem;
      color: #ef4444;
      font-size: 0.875rem;
    }

    .error-message svg {
      width: 1rem;
      height: 1rem;
    }

    .login-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.875rem;
    }

    .remember-me {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .remember-me input {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
      margin-right: 0.5rem;
    }

    .remember-me span {
      color: #4b5563;
    }

    .forgot-password {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .forgot-password:hover {
      color: #1d4ed8;
    }

    .submit-button {
      width: 100%;
      padding: 0.75rem 1rem;
      background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%);
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .submit-button:hover:not(:disabled) {
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    .submit-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .spinner {
      animation: spin 1s linear infinite;
      width: 1.25rem;
      height: 1.25rem;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .toggle-mode {
      margin-top: 1.5rem;
      text-align: center;
    }

    .toggle-mode p {
      color: #4b5563;
      font-size: 0.875rem;
    }

    .toggle-mode button {
      background: none;
      border: none;
      color: #2563eb;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      margin-left: 0.25rem;
      transition: color 0.2s;
    }

    .toggle-mode button:hover {
      color: #1d4ed8;
    }

    .auth-footer {
      text-align: center;
      color: #6b7280;
      font-size: 0.875rem;
      margin-top: 1.5rem;
    }

    @media (max-width: 640px) {
      .auth-card {
        padding: 1.5rem;
      }
      .auth-title {
        font-size: 1.5rem;
      }
      .login-options {
        flex-direction: column;
        gap: 0.75rem;
        align-items: flex-start;
      }
    }
  `]

})
export class AuthComponent {
  isLogin = true;
  showPassword = false;
  authForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      nom: [''],
      prenom: ['']
    });
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
    this.authForm.reset();
    
    if (!this.isLogin) {
      this.authForm.get('nom')?.setValidators([Validators.required]);
      this.authForm.get('prenom')?.setValidators([Validators.required]);
      this.authForm.get('confirmPassword')?.setValidators([Validators.required]);
    } else {
      this.authForm.get('nom')?.clearValidators();
      this.authForm.get('prenom')?.clearValidators();
      this.authForm.get('confirmPassword')?.clearValidators();
    }
    
    this.authForm.get('nom')?.updateValueAndValidity();
    this.authForm.get('prenom')?.updateValueAndValidity();
    this.authForm.get('confirmPassword')?.updateValueAndValidity();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.authForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} est requis`;
    }
    if (field?.hasError('email')) {
      return 'Email invalide';
    }
    if (field?.hasError('minlength')) {
      return 'Minimum 6 caractères';
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmation',
      nom: 'Nom',
      prenom: 'Prénom'
    };
    return labels[fieldName] || fieldName;
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      Object.keys(this.authForm.controls).forEach(key => {
        this.authForm.get(key)?.markAsTouched();
      });
      return;
    }

    if (!this.isLogin) {
      const password = this.authForm.get('password')?.value;
      const confirmPassword = this.authForm.get('confirmPassword')?.value;
      
      if (password !== confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas';
        return;
      }
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.isLogin) {
      this.authService.login({
        email: this.authForm.value.email,
        password: this.authForm.value.password
      }).subscribe({
        next: () => {
          this.router.navigate(['/']); // Redirection vers la page des rapports
        },
        error: (error: { error: { message: string; }; }) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Erreur de connexion';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.authService.register({
        email: this.authForm.value.email,
        password: this.authForm.value.password,
        nom: this.authForm.value.nom,
        prenom: this.authForm.value.prenom
      }).subscribe({
        next: () => {
          this.router.navigate(['/']); // Redirection vers la page des rapports
        },
        error: (error: { error: { message: string; }; }) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Erreur d\'inscription';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}