import { Component, OnInit } from '@angular/core';
import { PersonFirestore } from 'src/app/models/person';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import * as Faker from 'faker';

@Component({
  selector: 'app-authfirebase',
  templateUrl: './authfirebase.component.html',
  styleUrls: ['./authfirebase.component.scss']
})
export class AuthfirebaseComponent implements OnInit {

  public people$:Observable<PersonFirestore[]>;
  
  constructor(
    private fs: FirestoreService
  ) { }

  ngOnInit() {
    this.people$ = this.fs.fetchPeople();
  }
  public addPerson(){
    const person:PersonFirestore = {
      "name":     Faker.name.findName(),
      "email":    Faker.internet.email(),
      "age":      Math.round(Math.random() * 100),
      "city":     Faker.address.city(),
      "country":  Faker.address.country(),
    }
    this.fs.addPerson(person);
  }
  public delete(p:PersonFirestore){
  }
  public update(p:PersonFirestore){
    const payload = {
      "name":     Faker.name.findName(),
      "email":    Faker.internet.email(),
      "age":      Math.round(Math.random() * 100),
      "city":     Faker.address.city(),
      "country":  Faker.address.country(),
    }
  }
}
