import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      // Aquí puedes realizar la lógica de autenticación con los valores del formulario
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      // hacer login con el servicio de la API
      try {
        this.authService.login(username, password).then(response => {
          console.log(response);
          // guardar el token en el local storage
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.toastService.showSuccessToast('Login successful');
            this.router.navigate(['/home']);
          } else {
            this.toastService.showErrorToast(
              'Login failed. Check your credentials.'
            );
          }
        });
      } catch (error) {
        console.log(error);
        this.handleLoginError(error);
      }
    } else {
      console.log('Form error');
    }
  }

  handleLoginError(error: any) {
    let errorMessage = 'An error occurred during register.';
    if (error && error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    this.toastService.showErrorToast(errorMessage);
  }
}
