import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './authn/auth.guard'


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  
  { path: 'authn', loadChildren: () => import('./authn/authn.module').then(m => m.AuthnModule) },

   { path: '404', title: 'Error', redirectTo: '/error' },
  { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'bids', loadChildren: () => import('./bids/bids.module').then(m => m.BidsModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  
  { path: '**', title: 'Error', redirectTo: '/error' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
