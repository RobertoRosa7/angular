import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-projects',
  templateUrl: './panel-projects.component.html',
  styleUrls: ['./panel-projects.component.scss']
})
export class PanelProjectsComponent implements OnInit {
  public colors: string[] = ['#e22a53', '#27AE60','#2B2C2F','#FF2D00', '#e22a53'];
  public numbers: number[] = [0,1,2,3];

  constructor() { }

  ngOnInit() {
  }

}
