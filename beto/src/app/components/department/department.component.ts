import { Component, OnInit } from '@angular/core';
import { DepartmentsModel } from 'src/app/models/departments-model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  public depName: string;
  public departments: DepartmentsModel[] = [
    {name: 'dep 1', _id: 'ssdjflajfkl'},
    {name: 'dep 1', _id: 'ssdjflajfkl'},
    {name: 'dep 1', _id: 'ssdjflajfkl'},
    {name: 'dep 1', _id: 'ssdjflajfkl'},
    {name: 'dep 1', _id: 'ssdjflajfkl'},
    {name: 'dep 1', _id: 'ssdjflajfkl'},
  ];

  constructor() { }

  ngOnInit() {
  }

  public save(){
    console.log('save');
  }
  public cancel(){
    console.log('cancel');
  }
}
