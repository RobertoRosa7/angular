import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropzoneRoutingModule } from './dropzone-routing.module';
import { DropzoneComponent } from './dropzone.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MaterialModule } from 'src/app/app-material.module';
import { UploadFilesComponent } from '../../components/upload-files/upload-files.component';
import { MyFilesComponent } from '../../components/my-files/my-files.component';
import { DropFilesComponent } from '../../components/drop-files/drop-files.component';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [DropzoneComponent, UploadFilesComponent, MyFilesComponent, DropFilesComponent],
  imports: [
    CommonModule,
    DropzoneRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MaterialModule
  ]
})
export class DropzoneModule { }
