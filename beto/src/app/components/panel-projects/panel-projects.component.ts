import { Component, OnInit, HostListener, ViewChild, ElementRef, ViewChildren, QueryList, Output } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable, fromEvent } from 'rxjs';
import { Project, ProjectModel } from 'src/app/models/project';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { EventEmitterService } from 'src/app/services/broadcast.service';

@Component({
  selector: 'app-panel-projects',
  templateUrl: './panel-projects.component.html',
  styleUrls: ['./panel-projects.component.scss']
})
export class PanelProjectsComponent implements OnInit {
  public projects$:Observable<Project[]>;
  public today = new Date().getTime();
  public liked:number = 0;
  public unliked:number = 0;
  public viewed:number = 0;
  public commits:number = 0;
  public projetos: ProjectModel[] = [];
  public switchActions:string = '';

  constructor(
    private fs:FirestoreService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fs.fetchLocalProject()
        .subscribe((p) => (p) ? this.projetos = p : this.projetos = []);
    
    this.broadcastEvent();
  }
  private broadcastEvent(){
    const eventList = [
      'delete-project'
    ]
    eventList.forEach((e, i) => {
      switch(e){
        case 'delete-project':
          EventEmitterService.get(e)
            .subscribe((p: ProjectModel)=> {
              const i = this.projetos.findIndex(i => i.id_project === p.id_project);
              if(i >= 0) this.projetos.splice(i, 1);
              this.notification('Projeto deletado com sucesso')
            });
        break;
      }
    });
  }
  public openFormCreateProject(){
    this.switchActions = 'create-project';
  }
  public notification(msg){
    this.snackbar.open(msg, 'ok', {duration:2000});
  }
}
