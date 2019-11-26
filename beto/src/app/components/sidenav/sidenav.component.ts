import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input('drawer') drawer;

  public listsLinks: any[] = [
    {
      name: 'HOME',
      icon: undefined,
    },
    {
      name: 'portfólio',
      icon: undefined
    },
    {
      name: 'sobre',
      icon: undefined
    }
  ]
  constructor() { }

  ngOnInit() {
  }

  public closeSideMenu(){
    this.drawer.opened = false;
  }
}
