import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Person } from 'src/app/components/switch-merge/person.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  public people$: Observable<Person[]>;

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.people$ = this.mainService.fetchPeople();
  }

}
