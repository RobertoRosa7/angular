import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-files',
  templateUrl: './drop-files.component.html',
  styleUrls: ['./drop-files.component.scss']
})
export class DropFilesComponent implements OnInit {
  @Output() public droppedFiles = new EventEmitter<FileList>();

  // flag - para controlar entrada e saída do evento drag
  private isDraggingOver:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  public onDragOverEvent(e:DragEvent){
    e.preventDefault();
    this.isDraggingOver = true;
  }
  public onDragLeaveEvent(e:DragEvent){
    e.preventDefault();
    this.isDraggingOver = false;
  }
  public onDropEvent(e:DragEvent){
    e.preventDefault();
    // dataTransfer -> files
    // console.log(e.dataTransfer.files);
    const files:FileList = e.dataTransfer.files;
    this.droppedFiles.emit(files);
    this.isDraggingOver = false;
  }
}
