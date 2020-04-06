import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User, UserFirestore } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Store } from '@ngrx/store';
import { AppState, usersStore } from 'src/app/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input('drawer') drawer;
  public user$: Observable<UserFirestore>;
  // public user: UserFirestore;
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
    private fs: FirestoreService,
    private router:Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    // this.user$ = this.fs.fetchUser();
  this.user$ = this.store.select(usersStore.selectEntities)
      .pipe(
        map((u) => {
          for(const id in u){
            return u[id];
          }
        })
      )
  }

  public closeSideMenu(){
    this.drawer.opened = false;
  }
  public updateChange(event){
    this.router.navigateByUrl('component/' + event.value);
  }
}
