import { Component, OnInit, ViewEncapsulation, HostListener, Input } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
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
      fromEvent(document, 'keyup')
        .subscribe((k: any) => {
          if(k.keyCode == 27) this.drawerToggle(k);
      });
  }
  
  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.fetchUser();
  }
  public openSideNav(){
    this.sideNavOpened = !this.sideNavOpened;
  }
  public drawerToggle(event){
    this.drawer.toggle();
  }
  public logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
