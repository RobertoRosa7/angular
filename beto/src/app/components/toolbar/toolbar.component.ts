import { Component, OnInit, ViewEncapsulation, HostListener, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { User, UserFirestore } from 'src/app/models/user';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FirestoreService } from 'src/app/services/firestore.service';
import { EventEmitterService } from 'src/app/services/broadcast.service';
import { MatDrawerToggleResult, MatDrawer } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState, usersState, usersStore } from 'src/app/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ToolbarComponent implements OnInit {
  @Input('drawer') drawer:MatDrawer;
  @HostListener('window:resize', ['$event']) public onResize(event?){
    this.screenWidth = window.innerWidth;
  }
  @ViewChild('bar', {read:ElementRef, static: true}) bar:ElementRef;
  public navIsFixed:boolean;
  public screenWidth: number;
  public sideNavOpened: boolean = false;
  public authenticated$: Observable<boolean>;
  public user$: Observable<UserFirestore>;
  public xsScreen:boolean = false;
  public smScreen:boolean = false;
  public mdScreen:boolean = false;
  public itemHeight;
  public numberOfItems;
 
  constructor(
    private fs: FirestoreService,
    private breakpoints: BreakpointObserver,
    private router: Router,
    private store: Store<AppState>
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
      });
  }
  
  ngOnInit() {
    this.screenWidth = window.innerWidth;
    // this.authenticated$ = this.authService.isAuthenticated();
    this.authenticated$ = this.fs.isAuthenticated();
    // this.user$ = this.authService.fetchUser();
    // this.user$ = this.fs.fetchUser();
    // this.user$ = this.store.select(usersStore.selectAll);
    // this.store.select(usersStore.selectAll)
    //   .subscribe((u) => (u) ? this.user = u[0] : null);

    this.user$ = this.store.select(usersStore.selectEntities)
      .pipe(
        map((u) => {
            for(const id in u){
              return u[id];
            }
        })
      )
  }
  ngAfterViewInit(){
    fromEvent(document, 'keyup')
      .subscribe((k: any) => {
        if(k.keyCode == 27) this.drawer.close();
    });
  }
  public openSideNav(){
    this.sideNavOpened = !this.sideNavOpened;
  }
  public drawerToggle(event){
    this.drawer.toggle();
  }
  public logout(){
    // this.authService.logout();
    this.fs.logoutFire();
    this.router.navigateByUrl('/auth/login');
  }
}
