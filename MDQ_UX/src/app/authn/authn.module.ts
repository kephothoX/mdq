import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthnRoutingModule } from './authn-routing.module';
import { AuthnComponent } from './authn.component';

import { environment as environ } from 'src/environments/environment';


@NgModule({
  declarations: [
    AuthnComponent
  ],
  imports: [
    CommonModule,
    AuthnRoutingModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,

    
  ],
  providers: [
    
  ],

})
export class AuthnModule { }
