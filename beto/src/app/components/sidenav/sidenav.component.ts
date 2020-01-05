import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input('drawer') drawer;

  public options;
  public listsLinks: any[] = [
    {
      name: 'home',
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
  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public closeSideMenu(){
    this.drawer.opened = false;
  }
  public updateChange(event){
    this.router.navigateByUrl('component/' + event.value);
  }
}
