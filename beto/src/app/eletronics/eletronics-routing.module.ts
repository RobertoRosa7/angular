import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EletronicListComponent } from './eletronic-list/eletronic-list.component';
import { EletronicDetailsComponent } from './eletronic-list/eletronic-details/eletronic-details.component';


const routes: Routes = [
  // {path: 'eletronic', component: EletronicListComponent},
  // {path: 'eletronic/:index', component: EletronicDetailsComponent}
  {path: '', component: EletronicListComponent},
  {path: ':index', component: EletronicDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EletronicsRoutingModule { }
