import { Component, OnInit  } from '@angular/core';


import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  constructor(
    private _matSnackBar: MatSnackBar
  ) {}

  async ngOnInit() {

    
  }



}
