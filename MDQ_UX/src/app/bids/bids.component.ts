import { Component, OnInit } from '@angular/core';

import { Item } from './item';
import { BidsService } from './bids.service';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrl: './bids.component.scss'
})
export class BidsComponent {
  Items?: Item[];


  constructor(
    private _bidsService: BidsService
  ) {}


  ngOnInit(): void {
    this._bidsService.getAllItems().subscribe((response: any) => {
      this.Items = response;

      console.log(response);
    })
  }

}
