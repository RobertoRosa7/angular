import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DropzoneComponent } from '../pages/dropzone/dropzone.component';


const routes: Routes = [
  {path: '', component: DropzoneComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropzoneRoutingModule { }
