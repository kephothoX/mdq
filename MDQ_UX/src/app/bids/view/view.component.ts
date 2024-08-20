import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AppService } from 'src/app/app.service';
import { BidsService } from '../bids.service';
import { Item } from '../item';

import { environment } from 'src/environments/environment.dev';

import { MatSnackBar } from '@angular/material/snack-bar';

import {
  Client,
  PrivateKey,
  Wallet,
  Provider,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
  TransferTransaction,
  TokenType,
  TokenCreateTransaction,
  TokenSupplyType,
  TokenMintTransaction,
  PublicKey,
  TopicCreateTransaction,
  TopicMessageQuery,
  TopicMessageSubmitTransaction,
  FileCreateTransaction,
  FileInfoQuery

} from "@hashgraph/sdk";

import { Web3, MetaMaskProvider } from "web3";



declare global {
  interface Window {
    ethereum: any
  }
}


@Component({
  selector: 'app-item-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {
  myAccountId = environment.HEDERA_ACCOUNT_ID
  myPrivateKey = environment.HEDERA_PRIVATE_KEY;
  Item?: Item;
  topicID?: string;
  Response: any;
  SubscriptionResponse: any;
  WalletBalance: number = 0;
  ActiveAccount: any;

  HBar: number = 48185.222623;

  constructor(
    private _bidsService: BidsService,
    private _formBuilder: FormBuilder,
    private _appService: AppService,
    private _activatedRoute: ActivatedRoute,
    private _matSnackBar: MatSnackBar,
  ) { }

  async ngOnInit() {


    if (window.ethereum) {
      // use the injected Ethereum provider to initialize Web3.js

      const web3 = new Web3(window.ethereum);

      await window.ethereum.request({ method: "eth_requestAccounts" });


      const accounts = await web3.eth.getAccounts();
      // get the first account and populate placeholder
      window.sessionStorage.setItem('account', `${accounts[0]}`);

      this.ActiveAccount = `${accounts[0]}`;

      await web3.eth.getBalance(`${accounts[0]}`)
      .then((bal) => { 

        this.WalletBalance = parseFloat(web3.utils.fromWei(bal ,'ether')) * this.HBar;
      });

    } else {
      this._matSnackBar.open("Please  Open 'https://metamask.io/download/' and Install MetaMask</a>.", 'Dismiss');
      alert("Non-MetaMask Ethereum provider detected.");
    }

    this.topicID = this._activatedRoute.snapshot.params['id'];
    this._bidsService.getItemByID({ id: this._activatedRoute.snapshot.params['id'] }).subscribe((response: any) => {

      this.Item = response[0];

    });
  }

  newBidForm = this._formBuilder.group({
    topicID: ['', Validators.required],
    bid_amount: ['', Validators.required],
  });


  accountForm = this._formBuilder.group({
    amount: ['', Validators.required],
  });


  async ngOnSubmit() {
    const account = `${window.sessionStorage.getItem('account')}`;
    const bid_amount = this.newBidForm.value.bid_amount;
    const topicID = this.newBidForm.value.topicID;

    if (window.ethereum) {
      // use the injected Ethereum provider to initialize Web3.js

      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      this.Response = `Amount Available on Your Wallet: ${ this.WalletBalance } in (HBars)`;


      if (!this.myAccountId || !this.myPrivateKey) {

        this._matSnackBar.open("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present", 'Dismiss');

        this.Response = "Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present";
      }

      const client = Client.forTestnet();

      client.setOperator(this.myAccountId, this.myPrivateKey);

      this.Response = "Client Connected Successfully";

      const accountBalance = await new AccountBalanceQuery()
        .setAccountId(this.myAccountId)
        .execute(client);

      this.WalletBalance = parseFloat(`${accountBalance.hbars.toTinybars()}`);

      if (parseFloat(`${this.accountForm.value.amount}`) > accountBalance.hbars.toTinybars()) {
        this.Response = `Insufficient Funds In Your Account. Balance: ${accountBalance.hbars.toTinybars()} HBars`

      } else {

        this._bidsService.submitTopicMessage({
          account: account,
          bid: bid_amount,
          topicID: topicID
        }).subscribe((response: any) => {

          this._matSnackBar.open(`${JSON.stringify(response)}`, 'Dismiss');
        });


        web3.eth.sendTransaction({
          from: this.ActiveAccount,
          to: environment.ACCOUNT,
          value: parseFloat(`${this.newBidForm.value.bid_amount}`)
        })
        .on("sending", (sending) => {
          this.Response = `Sending:  ${ sending }`;
        })
        .on("sent", (sent) => {
          this.Response = `Sent:", sent }`;
        })
        .on("transactionHash", (transactionHash) => {
          this.Response = `Transaction Hash: ${ transactionHash }`;
        })
        .on("receipt", (receipt) => {
          this.Response = `Receipt:  ${ receipt }`;
        })
        .on("confirmation", (confirmation) => {
          this.Response = `Confirmation:  ${ confirmation }`;
          process.exit(0);
        })
       .on("error", (error) => {
         this.Response = `Error:  ${ error }`;
         process.exit(1);
        });

        const transaction = new TransferTransaction()
          .addHbarTransfer(this.myAccountId, new Hbar(- parseFloat(`${this.newBidForm.value.bid_amount}`)))
          .addHbarTransfer(`${environment.ACCOUNT}`, new Hbar(1));

        //Submit the transaction to a Hedera network
        const txResponse = await transaction.execute(client);

        //Request the receipt of the transaction
        const receipt = await txResponse.getReceipt(client);

        //Get the transaction consensus status
        const transactionStatus = receipt.status;
      }
    } else {
      this._matSnackBar.open("Please  Open 'https://metamask.io/download/' and Install MetaMask</a>.", 'Dismiss');
      alert("Non-MetaMask Ethereum provider detected.");
    }
  }



  async onBuy() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      this.Response = `Amount Available on Your Wallet: ${await web3.eth.getBalance('0xb13e866E1DCfAC18519F929539e19434aaB0a6CF')}`;

      if (!this.myAccountId || !this.myPrivateKey) {

        this._matSnackBar.open("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present", 'Dismiss');

        this.Response = "Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present";
      }

      const client = Client.forTestnet();

      client.setOperator(this.myAccountId, this.myPrivateKey);

      this.Response = "Client Connected Successfully";

    

      this.WalletBalance = this.WalletBalance;

      if (parseFloat(`${this.accountForm.value.amount}`) > this.WalletBalance) {
        this.Response = `Insufficient Funds In Your Account. Balance: ${ this.WalletBalance } HBars`

      } else {

        web3.eth.sendTransaction({
          from: this.ActiveAccount,
          to: environment.ACCOUNT,
          value: parseFloat(`${this.accountForm.value.amount}`)
        })
        .on("sending", (sending) => {
          this.Response = `Sending:  ${ sending }`;
        })
        .on("sent", (sent) => {
          this.Response = `Sent:", sent }`;
        })
        .on("transactionHash", (transactionHash) => {
          this.Response = `Transaction Hash: ${ transactionHash }`;
        })
        .on("receipt", (receipt) => {
          this.Response = `Receipt:  ${ receipt }`;
        })
        .on("confirmation", (confirmation) => {
          this.Response = `Confirmation:  ${ confirmation }`;
          process.exit(0);
        })
       .on("error", (error) => {
         this.Response = `Error:  ${ error }`;
         process.exit(1);
        });



        const transaction = new TransferTransaction()
          .addHbarTransfer(this.myAccountId, new Hbar(- parseFloat(`${this.newBidForm.value.bid_amount}`)))
          .addHbarTransfer(`${environment.ACCOUNT}`, new Hbar(1));

        //Submit the transaction to a Hedera network
        const txResponse = await transaction.execute(client);

        //Request the receipt of the transaction
        const receipt = await txResponse.getReceipt(client);

        //Get the transaction consensus status
        const transactionStatus = receipt.status;
      }
    } else {
      this._matSnackBar.open("Please  Open 'https://metamask.io/download/' and Install MetaMask</a>.", 'Dismiss');
      alert("Non-MetaMask Ethereum provider detected.");
    }
  }


  subscribeToTopic(topic: string) {
    if (!this.myAccountId || !this.myPrivateKey) {

      this._matSnackBar.open("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present", 'Dismiss');

      this.Response = "Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present";
    }

    const client = Client.forTestnet();

    client.setOperator(this.myAccountId, this.myPrivateKey);

    this.SubscriptionResponse = "Client Connected Successfully";
    this.SubscriptionResponse = new TopicMessageQuery()
      .setTopicId(topic)
      .setStartTime(0)
      .subscribe(
        client,
        null,
        (message) => this.SubscriptionResponse = Buffer.from(`${message?.contents}`, "utf8").toString()
      );
  }

  openOnHashScan(topicID: string): void {
    window.location.href = `https://hashscan.io/testnet/topic/${topicID}`
  }


}
