import { Component, OnInit, HostListener, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable, fromEvent } from 'rxjs';
import { Project } from 'src/app/models/project';
import { map } from 'rxjs/operators';
import { MatListItem } from '@angular/material';

@Component({
  selector: 'app-panel-projects',
  templateUrl: './panel-projects.component.html',
  styleUrls: ['./panel-projects.component.scss']
})
export class PanelProjectsComponent implements OnInit {
  public colors:string[] = ['#e22a53', '#27AE60','#2B2C2F','#FF2D00', '#e22a53'];
  public numbers:number[] = [0,1,2,3];
  public projects$:Observable<Project[]>;
  public today = new Date().getTime();

  constructor(
    private fs:FirestoreService
  ) { }

  ngOnInit() {
    this.projects$ = this.fs.fetchProjects()
      .pipe(
        map((p:Project[]) => {
          if(p){
            return p.map(w => {
              return {
                ...w, 
                description:this.cutwords(w.description),
                name:this.cutwords(w.name)
              }
            });
          }
        })
      )
  }
  public cutwords(words:string){
    let shortText:string = ''
    
    if(words.length > 50) shortText = words.substring(0, 50) + '...';
    else shortText = words;

    return shortText;
  }

}
