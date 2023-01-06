import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { FirebaseRoutingModule } from '../routes/firebase-routing.module';
import { FirebaseComponent } from '../pages/firebase/firebase.component';
import { MaterialModule } from 'src/app/app-material.module';
import { ProductsComponent } from '../components/products/products.component';

@NgModule({
  declarations: [FirebaseComponent, ProductsComponent],
  imports: [
    CommonModule,
    FirebaseRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MaterialModule
  ]
})
export class FirebaseModule { }
