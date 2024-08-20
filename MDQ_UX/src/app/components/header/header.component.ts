import { Component, OnInit } from '@angular/core';

import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title?: String;
  profileId?: String;
  imageURL!: String;

  accountEmail?: string | null | undefined = window.sessionStorage.getItem('email');

  formData = new FormData();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _appService: AppService,
    public _snackBar: MatSnackBar,
    public _matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
   
  }

  connectWallet(): void {
    this._appService.initWallet();
  }


  logOutUser() {
    this._router.navigate(['/authn/logout']);

  }

  getHederaCredentials(): void {
    window.location.href="https://portal.hedera.com/dashboard"
  }

}
