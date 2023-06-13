import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController
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
      this.authService.register(username, password, name).then(response => {
        console.log(response);
        // guardar el token en el local storage
        localStorage.setItem('token', response.token);
        //show toast message
        //redirect to home page
        this.toastController
          .create({
            message: 'Register successful',
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
