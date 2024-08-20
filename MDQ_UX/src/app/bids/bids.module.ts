import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';


import { BidsRoutingModule } from './bids-routing.module';
import { BidsComponent } from './bids.component';
import { ViewComponent } from './view/view.component';



@NgModule({
  declarations: [
    BidsComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    BidsRoutingModule,
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    MatGridListModule,
    MatProgressBar,
    MatListModule,
    MatExpansionModule

  ]
})
export class BidsModule { }
