import { Component, OnInit } from '@angular/core';
import { DepartmentsModel } from 'src/app/models/departments-model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  public depName: string;
  public departments: DepartmentsModel[] = [];
  public depEidt: DepartmentsModel = null;
  public unsubscribe$: Subject<any> = new Subject();

  constructor(
    private depServices: DepartmentsService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.depServices.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(deps => (deps) ? this.departments = deps : [])
  }
  public save(){
    if(this.depEidt){
      this.depServices.edit({name: this.depName, _id: this.depEidt._id})
        .subscribe(
            (dep) => {
              this.notification('departamento atualizado com sucesso.');
              this.clearField();
            },
            (err) => this.notification(err.error)
        )
    }else{
      this.depServices.add({name: this.depName})
      .subscribe(
        (dep) => {
          this.notification('departamento criado com sucesso.')
          this.clearField();
        },
        (err) => this.notification(err.error)
      )
    }
  }
  public cancel(){
    console.log('cancel');
  }
  public edit(dep: DepartmentsModel){
    this.depName = dep.name;
    this.depEidt = dep;
  }
  public delete(dep: DepartmentsModel){
    this.depServices.del(dep)
      .subscribe(
        () => this.notification('departamento excluído com sucesso.'),
        (err) => this.notification(err.error)
      )
  }
  public clearField(){
    this.depName = '';
    this.depEidt = null;
  }
  public notification(msg: string){
    this.snackbar.open(msg, 'ok', {duration: 3000});
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
  }

}
