import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

import jwtDecode from 'jwt-decode';
import { Subject, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChanged = new Subject<boolean>();

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    interval(5000).subscribe((i) => {
      this.authChanged.next(this.isAuthenticated());
    });
  }

  isAuthenticated() {
    const token = window.localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const data = jwtDecode(token);

    return data.exp * 1000 > Date.now();
  }

  isAuthorizedAdmin() {
    const token = jwtDecode(window.localStorage.getItem('token'));

    return token.user.roles.includes('ROLE_ADMIN');
  }

  logout() {
    window.localStorage.removeItem('token');
    this.authChanged.next(false);
  }

  getToken() {
    return window.localStorage.getItem('token');
  }

  authenticate(credentials: Credentials) {
    return this.http
      .post(environment.apiUrl + '/login_token', credentials)
      .pipe(
        tap((data: { token: string }) => {
          window.localStorage.setItem('token', data.token);
          //lancer l'observable
          this.authChanged.next(true);
        })
      );
  }

  getUser() {
    return jwtDecode(this.getToken()).user;
  }
}

/***CREDENTIALS INTERFACE */
export interface Credentials {
  username: string;
  password: string;
}

export interface Token {
  exp: number;
  int: number;
  roles: Array<string>;
  username: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Array<string>;
  };
}
