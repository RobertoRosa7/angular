import { Component, OnInit } from '@angular/core';
import { MyUploadFile } from 'src/app/models/upload-files';
import { Observable } from 'rxjs';
import { DropzoneService } from 'src/app/services/dropzone.service';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {
  public files$:Observable<MyUploadFile[]>;

  constructor(
    private dropzoneService: DropzoneService
  ) { }

  ngOnInit() {
    this.files$ = this.dropzoneService.fetchFiles();
  }

  public deleteFile(f:MyUploadFile){
    this.dropzoneService.deleteFile(f);
  }

}
