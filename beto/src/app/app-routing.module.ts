import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ClientsComponent } from './page/clients/clients.component';
import { DrivenFormsComponent } from './page/driven-forms/driven-forms.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'http-request', component: ClientsComponent
  },
  {
    path: 'forms', component: DrivenFormsComponent
  },
  {
    path: '**', redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
