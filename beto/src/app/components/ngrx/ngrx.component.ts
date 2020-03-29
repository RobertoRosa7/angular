import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { Observable } from 'rxjs';
import * as Faker from 'faker';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { PersonNew, PersonAll, PersonUpdate, PersonDelete } from 'src/app/store/person.actions';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.scss']
})

export class NgrxComponent implements OnInit {
  
  public people$:Observable<Person[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new PersonAll());
    this.people$ = this.store.pipe(select('people'));
  }

  public addPerson(){
    const person:Person = {
      "name":     Faker.name.findName(),
      "address":  Faker.address.streetAddress(),
      "age":      Math.round(Math.random() * 100),
      "city":     Faker.address.city(),
      "country":  Faker.address.country(),
      "_id":      new Date().getMilliseconds().toString()
    }
    this.store.dispatch(new PersonNew({ person }));
  }
  public delete(p:Person){
    this.store.dispatch(new PersonDelete({ "id":p._id }));
  }
  public update(p:Person){
    const payload = {
      "name":     Faker.name.findName(),
      "address":  Faker.address.streetAddress(),
      "age":      Math.round(Math.random() * 100),
      "city":     Faker.address.city(),
      "country":  Faker.address.country(),
      "_id":      p._id
    }
    this.store.dispatch(new PersonUpdate({ "person":payload }));
  }
}
