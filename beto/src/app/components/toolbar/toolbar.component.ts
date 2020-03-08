import { Component, OnInit, ViewEncapsulation, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ToolbarComponent implements OnInit {
  @Input('drawer') drawer;
  @HostListener('window:resize', ['$event'])
  onResize(event?){
    this.screenWidth = window.innerWidth;
  }
  public screenWidth: number;
  public sideNavOpened: boolean = false;
  public authenticated$: Observable<boolean>;
  public user$: Observable<User>;
  constructor(
    private authService: AuthService
  ) { 
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.fetchUser();
  }
  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }
  public openSideNav(){
    this.sideNavOpened = !this.sideNavOpened;
  }
  public drawerToggle(){
    this.drawer.toggle();
  }
  public logout(){
    console.log('logout');
  }
}
