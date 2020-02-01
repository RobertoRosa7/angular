import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { DepartmentsModel } from '../models/departments-model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private readonly api = 'http://localhost:8080/v1/department';
  /**
   * 
   * @param http trabalhando com behavior subject para centralização em um único request
   * assim não será necessário ficar chamando request sempre que for alterado um valor da lista
   * com isso, podemos centralizar os dados e em todos os ponto que estão sendo imprimido será
   * alterado sem precisar emitir um evento de atualização dos dados.
   */
  private depSubject$: BehaviorSubject<DepartmentsModel[]> = new BehaviorSubject<DepartmentsModel[]>(null);
  private loaded: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<DepartmentsModel[]>{
    if(!this.loaded){
      this.http.get<DepartmentsModel[]>(this.api)
        .pipe( tap((deps) => (deps) ? this.orderByName(deps): []))
        .subscribe(this.depSubject$);
      this.loaded = true;
    }
    return this.depSubject$.asObservable();
  }
  // public get(): Observable<DepartmentsModel[]>{
  //   return this.http.get<DepartmentsModel[]>(this.api)
  // }
  public add(d: DepartmentsModel): Observable<DepartmentsModel>{
    return this.http.post<DepartmentsModel>(this.api, d)

    // adicionando novos department no subject ordenado pelo nome
    .pipe( tap((dep: DepartmentsModel) => {
      this.depSubject$.getValue().push(dep)
      return this.orderByName(this.depSubject$.getValue());
    }))
  }
  public del(d: DepartmentsModel): Observable<any>{
    return this.http.delete<any>(`${this.api}/${d._id}`)
    
    // removendo item do subject e atualizando a lista
    .pipe( tap(() => {
      const depVirtualList = this.depSubject$.getValue();
      const index = depVirtualList.findIndex(id => id._id == d._id);
      if(index >= 0) depVirtualList.splice(index, 1);
    }))
  }
  public edit(d: DepartmentsModel): Observable<DepartmentsModel>{
    return this.http.patch<DepartmentsModel>(`${this.api}/${d._id}`, d)

    // atualizando a lista de departamento
    .pipe( tap((dep) => {
      const depVirtualList = this.depSubject$.getValue();
      const index = depVirtualList.findIndex(id => id._id == d._id);
      if(index >= 0) depVirtualList[index].name = dep.name;
    }))
  }
  private orderByName(list: any[]){
    return list.sort((a, b) => {
      if(a.name > b.name) return 1;
      if(a.name < b.name) return -1;
      return 0;
    });
  }
}
