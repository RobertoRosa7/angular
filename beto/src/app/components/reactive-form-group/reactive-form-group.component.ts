import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { switchAll, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-form-group',
  templateUrl: './reactive-form-group.component.html',
  styleUrls: ['./reactive-form-group.component.scss']
})
export class ReactiveFormGroupComponent implements OnInit {

  public clientForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    names: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    })
  });

  constructor() { }

  ngOnInit() {
    // this.clientForm.valueChanges
    // .pipe(mergeAll())
    // .subscribe(values => console.log(values));
  }
  onSubmit(){
    // console.log('send form', this.clientForm.value);
    console.log(`
      First Name: ${this.clientForm.value.firstName},
      Last Name: ${this.clientForm.value.lastName},
      Names / First: ${this.clientForm.value.names.firstName},
      Names / Last: ${this.clientForm.value.names.lastName}
    `)
  }
}
