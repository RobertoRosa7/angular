import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input('drawer') drawer;
  public user$: Observable<User>;
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
    private productService:ProductsService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.user$ = this.authService.fetchUser();
  }

  public closeSideMenu(){
    this.drawer.opened = false;
  }
  public updateChange(event){
    this.router.navigateByUrl('component/' + event.value);
  }
}
