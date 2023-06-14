import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username;
      const password = this.registerForm.value.password;
      const name = this.registerForm.value.name;
      // hacer login con el servicio de la API
      try {
        this.authService.register(username, password, name).then(response => {
          console.log(response);
          if (response.token) {
            localStorage.setItem('token', response.token);
            //show toast message
            //redirect to home page
            this.toastService.showSuccessToast('Register successful');
          } else {
            this.toastService.showErrorToast(
              'Register failed. Try again with .'
            );
          }
        });
      } catch (error) {
        console.log(error);
        this.handleRegisterError(error);
      }
    } else {
      console.log('Form error');
    }
  }

  handleRegisterError(error: any) {
    let errorMessage = 'An error occurred during register.';
    if (error && error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    this.toastService.showErrorToast(errorMessage);
  }
}
