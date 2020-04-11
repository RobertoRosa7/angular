import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel, Project } from 'src/app/models/project';
import { EventEmitterService } from 'src/app/services/broadcast.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-card-project',
  templateUrl: './card-project.component.html',
  styleUrls: ['./card-project.component.scss']
})
export class CardProjectComponent implements OnInit {
  @Input() public projeto;

  constructor(
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  public storeProject(p:ProjectModel){
    console.log(p);
  }
  public deleteProject(p:ProjectModel){
    EventEmitterService.get('delete-project').emit(p);
  }
  public editProject(p:ProjectModel){
    console.log(p);
  }
  public socialLiked(p:ProjectModel){
    if(!p.social.liked){
      p.social.liked = true;
      p.social.totalLiked += 1;
      this.notification('Gostei adicionado');
    }else{
      p.social.liked = false;
      p.social.totalLiked -= 1;
      this.notification('Gostei foi removido');
    }
  }
  public socialUnliked(p:ProjectModel){
    if(!p.social.unliked){
      p.social.unliked = true;
      p.social.totalUnliked += 1;
      this.notification('Não gostei adicionado');
    }else{
      p.social.unliked = false;
      p.social.totalUnliked -= 1;
      this.notification('Não gostei removido');
    }
  }
  public notification(msg){
    this.snackbar.open(msg, 'ok', {duration:2000});
  }
}
