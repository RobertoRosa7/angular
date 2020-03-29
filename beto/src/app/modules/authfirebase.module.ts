import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthfirebaseComponent } from '../pages/authfirebase/authfirebase.component';
import { AuthfirebaseRoutingModule } from '../routes/authfirebase-routing.module';


@NgModule({
  declarations: [AuthfirebaseComponent],
  imports: [
    CommonModule,
    AuthfirebaseRoutingModule
  ]
})
export class AuthfirebaseModule { }
