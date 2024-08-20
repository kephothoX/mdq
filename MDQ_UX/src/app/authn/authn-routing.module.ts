import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthnComponent } from './authn.component';

const routes: Routes = [
  { path: '', component: AuthnComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthnRoutingModule { }
