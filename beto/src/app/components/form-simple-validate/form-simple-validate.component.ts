import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/driven-form.models';

@Component({
  selector: 'app-form-simple-validate',
  templateUrl: './form-simple-validate.component.html',
  styleUrls: ['./form-simple-validate.component.scss']
})
export class FormSimpleValidateComponent implements OnInit {
  public client: Client = {
    firstName: '',
    lastName: '',
    birth: new Date(),
    state: '',
    street: '',
    phone1: '',
    phone2: '',
    city: '',
    gender: ''
  }
  constructor() { }

  ngOnInit() {
  }

}
