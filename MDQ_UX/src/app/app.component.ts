import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AppService } from './app.service';

import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MDQ';


  constructor(
    private _appService: AppService,
    private _router: Router,
    public _matSnackBar: MatSnackBar
  ) { }


  async ngOnInit() {

    
  }

 //'/list?page=1&number=100' \


}
