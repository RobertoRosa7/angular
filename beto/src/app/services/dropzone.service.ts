import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DropzoneService {

  constructor(
    private afs:AngularFireStorage
  ) { }

  public uploadFile(f:File){
    const pathFile = `myFiles/${f.name}`;
    const task = this.afs.upload(pathFile, f);
    
    task.snapshotChanges()
      .subscribe((s) => console.log(s));
  }
}
