import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidsComponent } from './bids.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  { path: '', component: BidsComponent },
  { path: 'view/:id', title: 'View Item', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidsRoutingModule { }
