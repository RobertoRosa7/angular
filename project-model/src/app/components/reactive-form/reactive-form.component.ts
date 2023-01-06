import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/driven-form.models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  // public client: Client = {
  //   firstName: '',
  //   lastName: '',
  //   birth: new Date(),
  //   state: '',
  //   street: '',
  //   email: '',
  //   phone2: '',
  //   city: '',
  //   gender: ''
  // }
  public firstName = new FormControl('');
  public lastName = new FormControl('');
  constructor() { }

  ngOnInit() {
    this.firstName.valueChanges.subscribe(name => console.log(name));
  }

  public applyName(){
    this.firstName.setValue('Kakashi Kisura');
  }
  public onSubmit(){
    console.log('send form');
  }
}
