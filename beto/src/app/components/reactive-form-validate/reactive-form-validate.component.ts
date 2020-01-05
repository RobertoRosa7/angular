import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-validate',
  templateUrl: './reactive-form-validate.component.html',
  styleUrls: ['./reactive-form-validate.component.scss']
})
export class ReactiveFormValidateComponent implements OnInit {

  public clientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: ['']
    })
  });
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}
