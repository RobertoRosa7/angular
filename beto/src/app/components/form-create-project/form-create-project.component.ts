import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { UploadFile } from 'src/app/models/upload-files';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectModel } from 'src/app/models/project';
import { MatSnackBar } from '@angular/material';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-form-create-project',
  templateUrl: './form-create-project.component.html',
  styleUrls: ['./form-create-project.component.scss']
})
export class FormCreateProjectComponent implements OnInit {

  public isHovering:boolean = false;
  private files:UploadFile[] = [];
  public formProject: FormGroup;
  public showUploadSnackbar:boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }
  public createProject(){
    console.log(this.formProject.value, this.files);
    if(this.files.length > 0) this.showUploadSnackbar = true;
    const payload = {
      name: this.formProject.value.name,
      desc: this.formProject.value.desc,
      album:this.files,
      created_at: new Date().getTime()
    }
  }
  private initializeForm(){
    const fields = { name:['', [Validators.required]], desc:[''] }
    this.formProject = this.fb.group(fields)
  }
  public onDragOverEvent(e:DragEvent){
    e.preventDefault();
    this.isHovering = true;
  }
  public onDragLeaveEvent(e:DragEvent){
    e.preventDefault();
    this.isHovering = false;
  }
  public onUploadFile(e:Event){
    const files:FileList = e.target['files'];
    this.prepareFileToUpload(files);
  }
  public onDropEvent(e:DragEvent){
    e.preventDefault();
    this.isHovering = false;
    const files:FileList = e.dataTransfer.files;
    this.prepareFileToUpload(files);
  }
  private prepareFileToUpload(files:FileList){
    // clear data for new uploads
    this.files.slice(0, files.length);

    // validate files
    const filesValidate:any = this.validateFiles(files);

    for(let i = 0; i < filesValidate.length; i++){
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
  public validateFiles(files:FileList){
    const imageListAllow:string[] = ['png', 'jpg', 'jpeg', 'gif'];
    const isFile:any[] = [];
    const isImage:any[] = [];
    const blackList:any[] = [];
    
    for(let i = 0; i < files.length; i++){
      let fileType = files[i].type.split('/')[1];
      let fileFormat = files[i].name.split('.')[1];
      let fileName = files[i].name.split('.')[0];
      let hashName = this.utilsService.encrypto(fileName);
      let fileHasName = `${hashName}.${fileFormat}`;

      let img = imageListAllow.includes(fileType);
      (img) ? isImage.push(files[i]) : isFile.push(files[i]);
    }

    const totalFiles = files.length;
    const totalIsFile = isFile.length;
    const totalIsImage = isImage.length;

    this.notification(`Total de imagens: ${totalIsImage}`);
    
    if(isFile.length > 0){
      isFile.forEach(file => {
        console.log(file);
      });
    }
    return isImage;
  }
  public removeFile(i){
    this.files.splice(i, 1);
  }
  private notification(msg){
    this.snackbar.open(msg, 'Ok', {duration: 2000, panelClass:'animated-snackbar'});
  }
}
