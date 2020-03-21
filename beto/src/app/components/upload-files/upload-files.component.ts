import { Component, OnInit } from '@angular/core';
import { DropzoneService } from 'src/app/services/dropzone.service';
import { UploadFile } from 'src/app/models/upload-files';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  public files:UploadFile[] = [];

  constructor(
    private dropzoneService:DropzoneService
  ) { }

  ngOnInit() {
  }
  public onDroppedFiles(files:FileList){
    // remover todo conteúdo de files para novos itens
    this.files.splice(0, this.files.length);

    for(let i = 0; i < files.length; i++){
      // this.dropzoneService.uploadFile(files.item(i));
      this.files.push({
        "file":files.item(i),
        "bytesuploaded":null,
        "canceled":null,
        "error":null,
        "finished":null,
        "paused":null,
        "state":null,
        "task":null,
        "uploading":null,
        "percentage":null
      });
    }
  }
  public removeFileFromList(i){
    this.files.splice(i,1);
  }
}
