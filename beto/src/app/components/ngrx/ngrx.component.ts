import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.scss']
})
export class NgrxComponent implements OnInit {
  public people$:Observable<Person[]>;

  constructor() { }

  ngOnInit() {
  }

  public addPerson(){
    console.log('add person');
  }
  public delete(p: Person){
    console.log(p);
  }
  public update(p: Person){
    console.log(p);
  }
}
