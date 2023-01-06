import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/driven-form.models';

@Component({
  selector: 'app-form-simple-validate',
  templateUrl: './form-simple-validate.component.html',
  styleUrls: ['./form-simple-validate.component.scss']
})
export class FormSimpleValidateComponent implements OnInit {
  /*
    ng-untouched: elemento não foi tocado
    ng-prestine: valor não foi alterado
    ng-invalid: elemento não foi validado - default
    
    ng-touched: houve click e saiu do focus
    ng-dirty: houve alteração do valor inicial
    ng-valid: elemento validado
  */
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
  constructor() { }

  ngOnInit() {
  }
  public onSubmit(){
    
  }
}
