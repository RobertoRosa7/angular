import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirebaseComponent } from '../pages/firebase/firebase.component';


const routes: Routes = [
  {path: '', component: FirebaseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirebaseRoutingModule { }
