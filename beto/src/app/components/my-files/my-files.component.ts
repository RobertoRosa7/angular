import { Component, OnInit } from '@angular/core';
import { MyUploadFile } from 'src/app/models/upload-files';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {
  public files$:Observable<MyUploadFile[]>;

  constructor(
    private fs: FirestoreService
  ) { }

  ngOnInit() {
    this.files$ = this.fs.fetchFiles();
  }

  public deleteFile(f:MyUploadFile){
    this.fs.deleteFile(f);
  }

}
