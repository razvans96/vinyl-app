import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController
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
      this.authService.login(username, password).then(response => {
        console.log(response);
        // guardar el token en el local storage
        localStorage.setItem('token', response.token);
        //show toast message
        //redirect to home page
        this.toastController
          .create({
            message: 'Login successful',
            duration: 2000,
            color: 'success',
          })
          .then(toast => {
            toast.present();
            this.router.navigate(['/home']);
          });
      });
    } else {
      console.log('Form error');
    }
  }
}
