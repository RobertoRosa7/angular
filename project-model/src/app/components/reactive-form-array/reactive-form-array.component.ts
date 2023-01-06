import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-array',
  templateUrl: './reactive-form-array.component.html',
  styleUrls: ['./reactive-form-array.component.scss']
})
export class ReactiveFormArrayComponent implements OnInit {

  public clientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: ['']
    }),
    phones: this.fb.array(['']),
    children: this.fb.array([''])
  });
  public phones = this.clientForm.get('phones') as FormArray;
  public children = this.clientForm.get('children') as FormArray;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  public onSubmit(){
    console.log(this.clientForm.value);
  }
  public addPhone(){
    this.phones.push(this.fb.control(''));
  }
  public addFormChildren(){
    const group = this.fb.group({
      name: this.fb.control(''),
      age: this.fb.control('')
    });
    this.children.push(group);
  }
}
