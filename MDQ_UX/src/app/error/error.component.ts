import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  constructor(
    private _router: Router
    ) {}

  logoutUser() {
    window.sessionStorage.removeItem('isAuthenticated');

    window.sessionStorage.removeItem('DescopeSession');

    window.sessionStorage.removeItem('email');

    window.sessionStorage.removeItem('userId');
    window.sessionStorage.removeItem('familyName');
    window.sessionStorage.removeItem('givenName');

    window.sessionStorage.removeItem('name');

    window.sessionStorage.removeItem('refreshToken');
    window.sessionStorage.removeItem('sessionToken');

    this._router.navigate(['/personal/login']);

  }

}
