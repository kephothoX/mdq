import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NewItemComponent } from './new-item/new-item.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'upload', title: 'Upload Item', component: NewItemComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
