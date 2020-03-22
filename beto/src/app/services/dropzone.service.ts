import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadFile } from '../models/upload-files';
import { map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';

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

  public upload(f: UploadFile){
    const newFilename = `${new Date().getTime()}_${f.file.name}`;
    const pathFirestoreFile = `myFiles/${newFilename}`;
    
    f.task = this.afs.upload(pathFirestoreFile, f.file);
    // corrigido bug do state running ao final de upload - não altera seu status para finished
    f.state = f.task.snapshotChanges()
      .pipe(
        map((s) => s.task.snapshot.state),
        catchError((s) => of(f.task.task.snapshot.state)) // of(): return Observable<string>
      )
    this.fillAttribute(f);
  }

  private fillAttribute(f: UploadFile){
    f.percentage = f.task.percentageChanges();
    f.uploading = f.state.pipe(map((s) => s === 'running'));
    f.finished = from(f.task).pipe(map((s) => s.state === 'success')); // from(): converte then para Observable
    f.paused = f.state.pipe(map((s) => s === 'paused'));
    f.error = f.state.pipe(map((s) => s === 'error'));
    f.canceled = f.state.pipe(map((s) => s === 'canceled'));
    f.bytesuploaded = f.task.snapshotChanges().pipe(map((s) => s.bytesTransferred));
  }
}
