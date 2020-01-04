import { Component, OnInit } from '@angular/core';
import { Client } from './../../models/driven-form.models';

@Component({
  selector: 'app-driven-forms',
  templateUrl: './driven-forms.component.html',
  styleUrls: ['./driven-forms.component.scss']
})
export class DrivenFormsComponent implements OnInit {

  public client: Client = {
    firstName: '',
    lastName: '',
    birth: new Date(),
    state: '',
    street: '',
    email: '',
    phone2: '',
    city: '',
    gender: ''
  }
  public states = ['SP', 'RJ', 'MG', 'GO', 'CE', 'BA', 'SC', 'MA'];
  constructor() { }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.client);
  }
}
