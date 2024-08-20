import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.dev';

import { ErrorService } from './error/error.service';
import { Observable, catchError, of} from 'rxjs';

import { Web3, MetaMaskProvider } from "web3";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client, Hbar } from "@hashgraph/sdk";


declare global {
  interface Window {
    ethereum: any
  }
}


@Injectable({
  providedIn: 'root'
})
export class AppService {
  myAccountId = environment.HEDERA_ACCOUNT_ID
  myPrivateKey = environment.HEDERA_PRIVATE_KEY;

  constructor(
    private _errorService: ErrorService,
    private _httpClient: HttpClient,
    private _matSnackBar: MatSnackBar
  ) {  }

  httpOptionsMultipartForm = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data; boundary=---MDQ',
    }),
    response: 'json'
  }

  httpOptionsPlainForm = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    response: 'json'
  }


  APIEndpoint = environment.APIEndpoint;



  async clientSetUp() {
    if (!this.myAccountId || !this.myPrivateKey) {
        throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
    }

    const client = Client.forTestnet();

    client.setOperator(this.myAccountId, this.myPrivateKey);

    client.setDefaultMaxTransactionFee(new Hbar(1));

    client.setDefaultMaxQueryPayment(new Hbar(2));
   

    return client;

}





  async initWallet() {

    if (window.ethereum) {
      window.location.href="https://chainlist.org/?search=hedera";     
    } else {
      this._matSnackBar.open("Please  Open 'https://metamask.io/download/' and Install MetaMask</a>.", 'Dismiss');
      alert("Non-MetaMask Ethereum provider detected.");
    }
  }



  getAuthorizationToken(): Observable<any> {
    const data = {};
    return this._httpClient.post(`${ this.APIEndpoint }/token`, data).pipe(catchError(this._errorService.handleError));
  }

  listMerchants(): Observable<any> {

    return this._httpClient.get(`${ this.APIEndpoint }/getSquareMerchants`).pipe(catchError(this._errorService.handleError));
  }

  getCountryCodes(): Observable<any> {
      return this._httpClient.get('/assets/Countries.json').pipe(catchError(this._errorService.handleError));
  }

  getContentTags(): Observable<any> {
      return this._httpClient.get('/assets/Tags.json').pipe(catchError(this._errorService.handleError));
  }
  
}
