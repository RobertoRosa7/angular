import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthfirebaseComponent } from '../pages/authfirebase/authfirebase.component';
import { AuthfirebaseRoutingModule } from '../routes/authfirebase-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MaterialModule } from '../app-material.module';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AuthfirebaseComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AuthfirebaseRoutingModule,
    MaterialModule
  ]
})
export class AuthfirebaseModule { }
