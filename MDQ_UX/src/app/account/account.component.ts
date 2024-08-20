import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  ErrMsg: any

  constructor(
    private _formBuilder: FormBuilder,
    public _matSnackBar: MatSnackBar,
  ) {}



  async ngOnInit() {

    
  }



  newAccountForm = this._formBuilder.group({
    hederaPrivateKey: ['', Validators.required],
  });


  async ngOnSubmit() {
    //this.Web3.eth.accounts.wallet.add(`${ this.newAccountForm.value.hederaPrivateKey }`);
    
  }

}
