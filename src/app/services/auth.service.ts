import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuth: boolean = false;
  //create a variable to store the user id
  private userId: string = '';

  constructor() {}

  //create a function for login, and if it is succesfull store the token in the local storage //and update the isLoggedIn variable
  async login(username: string, password: string): Promise<any> {
    let response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    let data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      this.userId = data.userId;
      this.isAuth = true;
    }
    return data;
  }

  //create a function for register with username, password and name
  async register(
    username: string,
    password: string,
    name: string
  ): Promise<any> {
    let response = await fetch(`${this.apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, name }),
    });
    let data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      this.userId = data.userId;
      this.isAuth = true;
    }
    return data;
  }

  isLoggedIn() {
    //check if bearer token is in local storage
    return this.isAuth;
  }

  getUserId() {
    return this.userId;
  }
}
