import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';
import { environment } from 'src/environments/environment.dev';


@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss'
})
export class NewItemComponent implements OnInit {
  formData = new FormData();
  imageURLs = new Array();
  adImages = new Array();

  PreviewURL: any;
  ErrMsg: String= '';


  constructor (
    private _formBuilder: FormBuilder,
    private _adminService: AdminService,
    private _appService: AppService,
    private _router: Router,
    public _matSnackBar: MatSnackBar
  ) {}

  async ngOnInit() {
      //this._appService.initWallet();

     
  }


  newBidItemForm = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price_amount: ['', Validators.required],
    location: ['', Validators.required],
    bid_opens: ['', Validators.required],
    bid_closes: ['', Validators.required]

  });


  async ngOnSubmit() {
    const formValues = this.newBidItemForm.value;

    this.formData.append('name', `${ formValues.name }`);
    this.formData.append('bid_opens', `${ formValues.bid_opens }`);
    this.formData.append('bid_closes', `${ formValues.bid_closes }`);
    this.formData.append('description', `${ formValues.description }`);
    this.formData.append('price_amount', `${ formValues.price_amount }`);
    this.formData.append('location', `${ formValues.location }`);


    for (var x = 0; x < this.adImages.length; x++) {

        this.formData.append("item_images[]", this.adImages[x]);
        this.imageURLs.push(URL.createObjectURL(this.adImages[x]));
    }

    this._adminService.newItem(this.formData).subscribe((response: any) => {
      if(response != null || response != undefined ) {
        this._matSnackBar.open(`Item with id ${ response } created Successfully`, 'Dismiss');
      }
    });
 
  }

  resetForm(): void {
    this.newBidItemForm.reset();
  }

  
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {

      const _files = event.target.files;

      if (_files.length < 7) {
        this.ErrMsg = "Must Upload 5 Item Images"
      } else if (_files.length > 7) {
        this.ErrMsg = "Only 5 Item Images Required."
      }


      for (var x = 0; x < _files.length; x++) {

        this.formData.append("item_images[]", _files[x]);
        this.imageURLs.push(URL.createObjectURL(_files[x]));
      }
    }
  }



  previewDesign(url: String): void {
    this.PreviewURL = url;

  }

  async uploadDesign(url: String) {

    const getUrlExtension = (url: any) => {
      return url
        .split(/[#?]/)[0]
        .split(".")
        .pop()
        .trim();
    }

    const onImageEdit = async (imgUrl: any) => {
      var imgExt = getUrlExtension(imgUrl);

      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const file = new File([blob], "itemImage." + imgExt, {
        type: blob.type,
      });

      this.adImages.push(file);
    }

    onImageEdit(url);
  }


}
