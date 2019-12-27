import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { Person } from './person.model';
import { HttpClient } from '@angular/common/http';
import { map, mergeAll, mergeMap, switchAll, switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.scss']
})
export class SwitchMergeComponent implements OnInit {
  @ViewChild('searchBy', {static: true}) searchBy: ElementRef;
  public searchByNames: string;
  public people$: Observable<Person[]>;
  private readonly api: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.firstOptions();
    this.secondOptions();
  }
  private firstOptions(){
    fromEvent(this.searchBy.nativeElement, 'keyup')
      .subscribe(e => {
        this.filterPeople(this.searchByNames)
        // this.http.get(`${this.api}/${this.searchByNames}`)
        .subscribe(r => console.log(r));
      });
  }
  private filterPeople(searchNames): Observable<Person[]>{
    if(searchNames.length === 0) return of([]);
    return this.http.get<Person[]>(`${this.api}/${searchNames}`);
  }
  private secondOptions(){
    let keyup$ = fromEvent(this.searchBy.nativeElement, 'keyup'); 
    // let fetch$ = keyup$.pipe(map((e) =>  this.filterPeople(this.searchByNames)));
    // fetch$
    //   .pipe(mergeAll())
    //   .subscribe((data) => console.log(data));
    // this.people$ = fetch$.pipe(mergeAll());

    // this.people$ = keyup$.pipe(mergeMap((e) => this.filterPeople(this.searchByNames)));

    // this.people$ = keyup$
    //   .pipe(map((e) => this.filterPeople(this.searchByNames)))
    //   .pipe(switchAll());

    // this.people$ = keyup$.pipe(switchMap((e) => this.filterPeople(this.searchByNames)));

    this.people$ = keyup$.pipe(
      debounceTime(700),
      switchMap((e) => this.filterPeople(this.searchByNames))
      );

    // map() mapear resultado do observable;
    // mergeAll() chama subscribe para evitar repetição;
    // mergeMap() evita repetição de subcribe e ainda faz map;
    // switchAll() cancela requisições num curto tempo de evento, só realiza a última;
    // switchMap() não é necessário uso do map, só realiza a última requisição;
    // debounceTime() bloquea evento repetidos num curto intervalo de tempo;
  }
}
