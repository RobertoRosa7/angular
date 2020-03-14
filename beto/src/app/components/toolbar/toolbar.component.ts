import { Component, OnInit, ViewEncapsulation, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/user';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  public xsScreen:boolean = false;
  public smScreen:boolean = false;
  public mdScreen:boolean = false;
  constructor(
    private authService: AuthService,
    private breakpoints: BreakpointObserver,
    private router: Router
  ) { 
    this.breakpoints.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe(br => {
        if(br.breakpoints[Breakpoints.XSmall]){
          this.xsScreen = true;
          this.smScreen = false;
          this.mdScreen = false;
        }else if(br.breakpoints[Breakpoints.Small]){
          this.smScreen = true;
          this.xsScreen = false;
          this.mdScreen = false;
        }else if(br.breakpoints[Breakpoints.Medium]){
          this.mdScreen = true;
          this.xsScreen = false;
          this.smScreen = false;
        }
      })
  }
  
  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.fetchUser();
  }
  public openSideNav(){
    this.sideNavOpened = !this.sideNavOpened;
  }
  public drawerToggle(){
    this.drawer.toggle();
  }
  public logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
