import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ToolbarComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event?){
    this.screenWidth = window.innerWidth;
  }
  public screenWidth: number;
  constructor() { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

}
